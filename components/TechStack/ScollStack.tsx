"use client"
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function ScollStack() {
    return <>

        <div className='my-12'>
            <div className='text-center mt-10'>
                <p className='text-4xl font-bold text-primary uppercase '>Technology Stack behind this web application</p>
            </div>
            <div className='w-full h-auto'>
                <Marquee>
                    <div className="mr-16">
                        <Image src="/assets/icons/vercel.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/cloudflare.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/daisyui.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/github.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/clickup.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/tailwind.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/nextjs.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/nodejs.png" width="200" height="120" alt="vercel" priority />
                    </div>
                    <div className="mr-16">
                        <Image src="/assets/icons/mysql.png" width="200" height="120" alt="vercel" priority />
                    </div>
                </Marquee>
            </div>
        </div>
    </>
}