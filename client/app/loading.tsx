'use client'
import { Loading } from "gamon-react";

export default function RootLoading() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Loading />
            <p className="mt-10 text-lg">
                Loading Page...
            </p>
        </div>
    )
}
