import { Metadata } from "next";
import JobsList from "./components/JobsList";

export const metadata: Metadata = {
    title: 'Remote Job Hunt | Jobs',
    description: 'Remote Job Hunt jobs list',
}

export default function Jobs({searchParams}) {
    return (
        <JobsList listType={searchParams.list} />
    )
}
