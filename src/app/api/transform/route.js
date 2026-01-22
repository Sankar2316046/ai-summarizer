function buildInstructions(mode, targetLanguage, tone) {
  const base =
    "You are a helpful writing assistant. Be clear, concise, and reusable. Do not add extra commentary.";

  if (mode === "summarize") {
    return `${base} Summarize the text into a maximum of 5 bullet points.`;
  } else if (mode === "translate") {
    return `${base} Translate the given sentence to ${targetLanguage} language. Do not change names or product names.`;
  } else {
    return `${base} Rewrite the given text in a ${
      tone ? tone.toLowerCase() : "simple"
    } tone while preserving the meaning.`;
  }
}

export async function POST(request) {
  try {
    const { input, mode, targetLanguage, tone } = await request.json();

    const cleaned = input?.trim();
    if (!cleaned) {
      return Response.json({ error: "Input is required" }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const instructions = buildInstructions(mode, targetLanguage, tone);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000", // or your domain
          "X-Title": "NextJS AI Writer",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: cleaned },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error(err);
      return Response.json({ error: "OpenRouter API error" }, { status: 500 });
    }

    const data = await response.json();

    return Response.json({
      output: data.choices?.[0]?.message?.content || "",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
