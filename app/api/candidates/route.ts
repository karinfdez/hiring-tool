import { NextResponse } from "next/server";
import candidates from "@/app/mock_data/candidates.json";
import { delay, mayFail } from "@/app/lib/mockApi";
import { Candidate } from "@/app/lib/types";

export async function GET() {
    await delay();
    return NextResponse.json({
        candidates
    })
}

export async function PATCH(request: Request) {
    await delay();
    mayFail();

    const body = await request.json();
    const { id, stage } = body;

    const candidate = candidates.find((c: Candidate) => c.id === id);
    if (!candidate) {
        return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    // const activityHistory = candidate.activities;
    // const lastActivity = activityHistory[activityHistory.length - 1];
    // const newActivity = {
    //     id: `act_${id}_${activityHistory.length + 1}`,
    //     from: lastActivity.to,
    //     to: stage,
    //     timestamp: Date.now()
    // };

    candidate.stage = stage;

    return NextResponse.json({
        ...candidate,
        stage,
        // activities: [...activityHistory, newActivity]
    })
}
    
