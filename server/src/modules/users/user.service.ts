import cloudinary from "../../config/cloudinary.js";
import { prisma } from "../../config/prisma.js";
import type { User } from "../../generated/prisma/client.js";
import { AppError } from "../../utils/AppError.js";
import streamifier from "streamifier";

export class UserService {
  private prisma = prisma;

  async getUserProfile(userId: string): Promise<Omit<User, "password">> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    if (!user) {
      throw new AppError(404, "User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserById(userId: string): Promise<Partial<Omit<User, "password">>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        isVerified: true
      }
    })
    if (!user) {
      throw new AppError(404, "User not found");
    }
    return user;
  }

  async getAllUsers(): Promise<Array<Partial<Omit<User, "password">>>> {
    const users = await this.prisma.user.findMany({
      where: {
        role: {
          not: "ADMIN"
        },
        isVerified: true
      },

      include:{
        student:true,
        teacher:true
      }
    })
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    return usersWithoutPasswords;
  }
  async updateUser(userId: string, data: Partial<Omit<User, "id" | "password" | "createdAt" | "updatedAt">>): Promise<Omit<User, "password">> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    if (!user) {
      throw new AppError(404, "User not found");
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
  async deleteUser(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

   
    if (user.avatarUrl) {
      try {
        const urlWithoutQuery = user.avatarUrl.split('?')[0]!;
        const publicIdMatch = urlWithoutQuery.match(/\/v\d+\/(.+)$/);

        if (publicIdMatch && publicIdMatch[1]) {
          const publicId = publicIdMatch[1];
          console.log('Cloudinary public_id to delete:', publicId);
          const destroyResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
          console.log('Cloudinary destroy result:', destroyResult);
        }
      } catch (error) {
        console.error("Error deleting avatar from Cloudinary:", error);
      }
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.user.delete({
        where: { id: userId }
      });
      await tx.otp.deleteMany({
        where: { email: user?.email }
      });

    })
  }
  async updateUserAvatar(userId: string, fileBuffer: Buffer): Promise<Omit<User,"password">> {
    console.log(userId);
    const user = await this.prisma.user.findUnique({
      where: {id: userId}
    });
    if(!user){
      throw new AppError(404,"User not found");
    }
    const uploadResult = await new Promise<any>((resolve, reject)=>{
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "user_avatars",
          public_id: `${userId}_${Date.now()}`,
          resource_type: "image"
        },
        (error, result) => {
          if(error){
            reject(error);
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    })
    
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      width: 500,
      height: 500,
      crop: "fill",
      gravity: "face",
      secure: true
    });

    const updatedUser = await this.prisma.user.update({
      where: {id: userId},
      data: {avatarUrl: transformedUrl}
    });
    const {password,...userWithoutPassword} = updatedUser;
    return userWithoutPassword;
  
  }
}