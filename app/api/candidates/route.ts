import { NextResponse } from "next/server";
import candidates from "@/mock_data/candidates.json";

export default function GET() {
    return NextResponse.json({
        candidates
    })
}
