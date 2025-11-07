'use client';
import {  useState } from "react";
import { ErrorInfo } from "./errorInfo";
import { Spinner } from "./spinner";
import Image from "next/image";


interface FetcherProps {
    url: string;
    children?: React.ReactNode;
}
export function Fetcher({ url }: FetcherProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // useEffect(() => {
    //     setIsLoaded(false);
    //     setError(null);
    //     const checkImage = async () => {
    //         try {
    //             const response = await fetch(url, { method: 'HEAD' });
    //             if (!response.ok) {
    //                 throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    //             }
    //             setIsLoaded(true);
    //         } catch (err) {
    //             setError(err instanceof Error ? err.message : 'Unknown error');
    //         }
    //     };
    //     checkImage();
    // }, [url]);


 const handleLoad = () => {
        setIsLoaded(true);
        setError(null);
    };
    const handleError = () => {
        setError('Failed to load image');
        setIsLoaded(false);
    };



    if (error) {
        return <ErrorInfo error={error} />;
    }
    if (isLoaded) {
        return (
            <div >
                <Image src={url}
                    sizes="100vw"
                    width={300}
                    height={300}
                    alt="Picture"
                    priority={true}
                    unoptimized={true}
                    style={{ objectFit: 'cover' }}
                />
            </div>
        )


    }

    return (

         <div>
            <Image
                src={url}
                sizes="100vw"
                width={300}
                height={300}
                alt="Picture"
                priority={true}
                unoptimized={true}
                
                onLoad={handleLoad}
                onError={handleError}
                style={{ display: 'none',  objectFit: 'cover' }} // Скрываем, пока не загрузится
            />
            <Spinner />
        </div>
    );

}
