import type { NextConfig } from "next";

const nextConfig: NextConfig = {

images: {
           remotePatterns: [
               {
                   protocol: 'https',
                   hostname: 'i.pinimg.com',
               },
               {
                   protocol: 'https',
                   hostname: 'avatars.mds.yandex.net',
               },
               {
                   protocol: 'https',
                   hostname: 'getfile.dokpub.com',
               },
               {
                   protocol: 'https',
                   hostname: 'disk.yandex.net',
               },
               
               {
                   protocol: 'https',
                  hostname: 'downloader.disk.yandex.net',
               },
           ],
       },




};

export default nextConfig;


