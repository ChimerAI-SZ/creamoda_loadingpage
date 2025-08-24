// 这个脚本需要添加到主域名页面（www.creamoda.ai）中
// 用于监听来自iframe的导航请求

window.addEventListener('message', function(event) {
  // 验证消息来源（安全起见）
  if (event.origin !== 'https://creamoda-loadingpage.vercel.app') {
    return;
  }
  
  // 检查消息类型
  if (event.data.type === 'NAVIGATE_TO_ROUTE') {
    const targetUrl = event.data.url;
    console.log('Received navigation request:', targetUrl);
    
    // 执行导航
    window.location.href = targetUrl;
  }
});

// 可选：通知iframe父页面已准备好接收消息
window.addEventListener('load', function() {
  const iframe = document.querySelector('iframe'); // 根据实际选择器调整
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({
      type: 'PARENT_READY'
    }, 'https://creamoda-loadingpage.vercel.app');
  }
});
