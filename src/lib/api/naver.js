import axios from 'axios';

export const fetchNaverBlogPosts = async (query) => {
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
      params: {
        query,        // 검색어
        display: 10,  // 가져올 결과 수
        sort: 'sim',  // 정확도순 정렬
      },
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
    });
    return response.data.items; // 블로그 포스트 데이터 반환
  } catch (error) {
    console.error('Error fetching Naver blog posts:', error);
    throw new Error('네이버 블로그 데이터 가져오기 실패');
  }
};