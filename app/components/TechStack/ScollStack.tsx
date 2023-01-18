"use client"
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function ScollStack() {
    
    return <>
        <div className='my-12'>
            <div className='text-center mb-4 mt-10'>
                <p className='text-4xl font-bold text-primary uppercase '>Technology Stack behind this web application</p>
            </div>
            <div className='w-full h-auto'>
                <Marquee gradient={false} speed={50} direction={"right"}>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/vercel.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/cloudflare.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/daisyui.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/github.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/clickup.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/tailwind.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/nextjs.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/nodejs.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                    <div className="mx-4 w-full h-full flex  rounder-md ">
                        <div className="w-3/4  bg-opacity-70 mx-auto my-auto flex h-full px-4   rounded-md bg-base-300">
                            <Image className=' my-auto mx-auto ' src="/assets/icons/mysql.png" width="200" height="120" alt="vercel" priority />
                        </div>
                    </div>
                </Marquee>
            </div>
        </div>
    </>
}