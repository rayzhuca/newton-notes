from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY")
)

article = "PUT ARTICLE HERE"

entities = client.chat.completions.create(
  model="gpt-4",
  messages=[
    {"role": "system", "content": """
     Here are all of the possible topics: market impact, competition, opportunity, drawbacks, innovation, threats, intelligence, trends, financial performance, risks and challenges, leadership and management changes.
     Answer in a sentence for each topic. Answer in the following format: topic: description. Separate each topic with a new line.
     """},
    {"role": "user", "content": f"""Pick three of the most relevant topics and describe them about the article delimited by triple quotes.
     \"\"\"
        {article}
     \"\"\""""}
  ]
).choices[0].message.content

print(json.dumps(
    {
        "heading": entities.splitlines()
    }
, indent=4))