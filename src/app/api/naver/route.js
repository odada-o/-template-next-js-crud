import axios from 'axios';

console.log('Client ID:', process.env.NAVER_CLIENT_ID);
console.log('Client Secret:', process.env.NAVER_CLIENT_SECRET);


export async function GET() {
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
      params: {
        query: '음식', // 고정된 키워드
        display: 10,   // 가져올 글 개수
        sort: 'sim',   // 정확도 순 정렬
      },
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
    });

    return new Response(JSON.stringify(response.data.items), { status: 200 });
  } catch (error) {
    console.error('Error fetching Naver blog posts:', error);
    return new Response(JSON.stringify({ error: '데이터를 가져오는데 실패했습니다.' }), { status: 500 });
  }
}
