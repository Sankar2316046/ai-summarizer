import OpenAI from "openai";

function buildInstructions(mode,target,tone)
{
    const base= "You are helpful writing assistant. Be clear, concise and your responses should be easily reusable. Do not add extra commentary"

    if(mode=="summarise")
    {
        return `${base} Summarise the text into maximum of 5 bullet points.`
    }
    else if(mode=="translate")
    {
        return `${base} Translate the given sentence to ${target} language. Do not change the names or products mentioned.`
    }
    else
    {
        return `${base} Rewrite the given text into a ${tone ? tone : "simple"} tone. You should preserve the meaning`
    }


    
}

export async function POST(request) {
    try{
    const {input,mode,target,tone}=await request.json();

    const cleaned = input ? input.trim() : "";

    if(!cleaned)
    {
        return Response.json(
            {error:"Input is required"},
            {status:400}
        )
    }

    const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

    const aiResponse = await client.responses.create({
        model:"gpt-5-mini",
        instructions:buildInstructions(mode,target,tone),
        input:cleaned
    }
    )

    return Response.json({output:aiResponse.output_text || ""})
}
catch(error){
    return Response.json(
        {error:"Something went wrong"},
        {status:500}
    )
}
}