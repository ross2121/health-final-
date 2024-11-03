"use server"
import { NextResponse } from 'next/server';
import { verifyOTP } from '../../../components/atoms/cotrollers/route';
export const POST=async(req: Request)=>{
  try {
    return await verifyOTP(req);
  } catch (error) {
    return NextResponse.json({ message: 'Message not allowed',error }, { status: 405 });
  }

}
