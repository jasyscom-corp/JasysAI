# JasysAI API Documentation

## Overview

JasysAI provides a powerful, OpenAI-compatible API for accessing cutting-edge language models. Our API is designed to be simple, transparent, and developer-friendly with comprehensive features for building AI-powered applications.

## Base URL

```
https://jasysai.jasyscom-corp.workers.dev
```

## Quick Start

### Installation

```bash
# Install the OpenAI package
pip install openai
```

### Basic Usage

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://jasysai.jasyscom-corp.workers.dev/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)
```

## Authentication

### API Key Authentication

All API requests require authentication using an API key. Include your API key in the Authorization header:

```http
Authorization: Bearer your-api-key
```

### Getting Your API Key

1. Sign up at [JasysAI Dashboard](https://jasysai.jasyscom-corp.workers.dev/app)
2. Navigate to API Keys section
3. Generate a new API key
4. Copy and securely store your API key

## Available Models

### Free Tier Models
- `openai/gpt-3.5-turbo` - Fast and efficient for most tasks
- `anthropic/claude-3-haiku` - Compact and fast
- `meta-llama/llama-3.1-8b-instruct` - Open source alternative

### Premium Models
- `openai/gpt-4` - Advanced reasoning and capabilities
- `anthropic/claude-3-sonnet` - Balanced performance
- `openai/gpt-4-turbo` - Latest GPT-4 improvements

### Enterprise Models
- `anthropic/claude-3-opus` - Maximum capability
- `openai/gpt-4-vision-preview` - Multimodal capabilities
- `google/gemini-pro` - Google's latest model

## API Endpoints

### Chat Completions

Create chat completions with advanced language models.

**Endpoint:** `POST /v1/chat/completions`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| model | string | Yes | Model ID to use |
| messages | array | Yes | Array of message objects |
| temperature | number | No | Sampling temperature (0-2) |
| max_tokens | integer | No | Maximum tokens to generate |
| stream | boolean | No | Enable streaming responses |
| top_p | number | No | Nucleus sampling (0-1) |
| frequency_penalty | number | No | Frequency penalty (-2 to 2) |
| presence_penalty | number | No | Presence penalty (-2 to 2) |

#### Message Object

```json
{
  "role": "user|assistant|system",
  "content": "string"
}
```

#### Example Request

```bash
curl -X POST "https://jasysai.jasyscom-corp.workers.dev/v1/chat/completions" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

#### Response Format

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "openai/gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing is like..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 56,
    "completion_tokens": 31,
    "total_tokens": 87
  }
}
```

### Streaming Responses

Enable streaming for real-time responses:

```javascript
const response = await fetch('https://jasysai.jasyscom-corp.workers.dev/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'openai/gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }],
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const text = decoder.decode(value);
  console.log(text);
}
```

## Code Examples

### Python

```python
import openai

client = openai.OpenAI(
    api_key="your-api-key",
    base_url="https://jasysai.jasyscom-corp.workers.dev/v1"
)

# Simple chat
response = client.chat.completions.create(
    model="openai/gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

# Streaming
stream = client.chat.completions.create(
    model="openai/gpt-4",
    messages=[{"role": "user", "content": "Write a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

### JavaScript/Node.js

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key',
  baseURL: 'https://jasysai.jasyscom-corp.workers.dev/v1'
});

async function chat() {
  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain JavaScript closures.' }
    ],
    temperature: 0.7,
  });

  console.log(completion.choices[0].message.content);
}

chat();
```

### cURL

```bash
# Basic request
curl -X POST "https://jasysai.jasyscom-corp.workers.dev/v1/chat/completions" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Streaming request
curl -X POST "https://jasysai.jasyscom-corp.workers.dev/v1/chat/completions" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "message": "Invalid API key",
    "type": "invalid_request_error",
    "code": "invalid_api_key"
  }
}
```

### Common Error Codes

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| 400 | invalid_request_error | Invalid request parameters |
| 401 | invalid_api_key | Invalid or missing API key |
| 403 | permission_denied | Insufficient permissions |
| 429 | rate_limit_exceeded | Rate limit exceeded |
| 500 | api_error | Internal server error |
| 503 | service_unavailable | Service temporarily unavailable |

### Error Handling Best Practices

```python
import openai
from openai import OpenAIError

client = OpenAI(
    api_key="your-api-key",
    base_url="https://jasysai.jasyscom-corp.workers.dev/v1"
)

try:
    response = client.chat.completions.create(
        model="openai/gpt-4",
        messages=[{"role": "user", "content": "Hello!"}]
    )
except openai.AuthenticationError:
    print("Invalid API key")
except openai.RateLimitError:
    print("Rate limit exceeded")
except openai.APIError as e:
    print(f"API error: {e}")
```

## Rate Limits

### Free Tier
- 100 requests per day
- 10,000 tokens per day
- 60 requests per minute

### Premium Tier
- 1,000 requests per day
- 100,000 tokens per day
- 300 requests per minute

### Enterprise Tier
- 10,000 requests per day
- 1,000,000 tokens per day
- 1,000 requests per minute

## Usage Tracking

### Check Your Usage

```bash
curl -X GET "https://jasysai.jasyscom-corp.workers.dev/api/user/stats" \
  -H "Authorization: Bearer your-api-key"
```

### Usage Response

```json
{
  "total_requests": 150,
  "total_tokens": 12500,
  "daily_requests": 25,
  "daily_tokens": 2100,
  "remaining_requests": 75,
  "remaining_tokens": 7900
}
```

## Best Practices

### 1. Optimize Token Usage
- Use appropriate model sizes
- Set reasonable `max_tokens` limits
- Implement conversation truncation for long chats

### 2. Handle Errors Gracefully
- Implement exponential backoff for rate limits
- Cache responses when appropriate
- Monitor usage to avoid limits

### 3. Security
- Never expose API keys in client-side code
- Use environment variables for API keys
- Rotate API keys regularly

### 4. Performance
- Use streaming for long responses
- Implement request batching when possible
- Monitor response times

## SDKs and Libraries

### Official SDKs
- **Python**: `pip install openai`
- **JavaScript/Node.js**: `npm install openai`
- **Ruby**: `gem install openai`
- **Go**: `go get github.com/sashabaranov/go-openai`

### Community Libraries
- **PHP**: `composer require openai-php/client`
- **Java**: `implementation 'com.theokanning.openai-gpt3-java:service'`
- **C#**: `Install-Package OpenAI`

## Support

### Documentation
- [API Reference](#api-endpoints)
- [Code Examples](#code-examples)
- [Error Handling](#error-handling)

### Contact
- **Email**: support@jasysai.com
- **Documentation**: https://docs.jasysai.com
- **Status Page**: https://status.jasysai.com

### Community
- **Discord**: https://discord.gg/jasysai
- **GitHub**: https://github.com/jasysai
- **Twitter**: https://twitter.com/jasysai

## Changelog

### v1.0.0 (2026-01-18)
- Initial API release
- OpenAI-compatible chat completions
- Streaming support
- Comprehensive error handling
- Usage tracking and rate limiting

---

**Ready to get started?** [Sign up for your API key](https://jasysai.jasyscom-corp.workers.dev/app) and start building with JasysAI today!