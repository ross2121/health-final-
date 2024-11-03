"use server"
import { NextResponse } from 'next/server';
import { Login } from '../../../components/atoms/cotrollers/userroute';
export const POST=async(req: Request)=>{
  try {
    return await Login(req);
  } catch (error) {
    return NextResponse.json({ message: 'Message not allowed',error }, { status: 405 });
  }

}
