// @ts-expect-error
const componentsContext = require.context('./', true, /.ts$/);
const maps: string[] = [];

componentsContext.keys().forEach((filePath: string) => {
    // 获取文件中的 default 模块
    const filename = filePath.replace(
        /.\/(\w+)(\.html|\.ts)$/,
        (rs, $1, $2) => $1
    );

    if (filename !== 'index') {
        maps.push(filename);
    }
});

const titles: Record<string, string> = {
    demo01: '基础图形',
    demo02: '增加物体',
    demo03: '雾化',
    demo04: '材质覆盖',
    demo05: '自定义几何体',
    demo06: '照相机',
    demo07: '环境光',
    demo08: '点光源',
    demo09: '聚光灯',
    demo10: '方向光/太阳光',
    demo11: '半球光',
    demo12: '隧道跑车',
    demo13: 'ODC',
    demo14: 'Eath 地球',
    demo15: '雷达图',
    demo16: '雷达扩散图',
    demo17: '雷达扫描图',
    demo18: '地图勾勒',
    demo19: '地图围栏',
    demo20: '地图动态围栏',
    demo21: '热力图',
    demo23: '流光',
    demo24: 'ShadertoyMaterial'
};
document.body.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        :root {
            --primary: #1a73e8;
            --secondary: #34a853;
            --accent: #fbbc05;
            --dark: #202124;
            --light: #f8f9fa;
            --card-bg: rgba(255, 255, 255, 0.1);
        }
        
        body {
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: var(--light);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        h1 {
            font-size: 2.8rem;
            margin-bottom: 15px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            background: linear-gradient(90deg, var(--accent), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
        }
        
        .performance-info {
            margin-top: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .btn {
            background: linear-gradient(135deg, var(--primary), #0066cc);
            border: none;
            color: white;
            padding: 14px 30px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: bold;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
            background: linear-gradient(135deg, #0066cc, var(--primary));
        }
        
        .btn:active {
            transform: translateY(1px);
        }
        
        .carousel-container {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px 10px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .carousel {
            display: flex;
            transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
            padding: 10px 0;
        }
        
        .iframe-card {
            flex: 0 0 calc(25% - 20px);
            margin: 0 10px;
            background: var(--card-bg);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            min-height: 350px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .iframe-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .iframe-container {
            position: relative;
            width: 100%;
            height: 300px;
            overflow: hidden;
            background: linear-gradient(45deg, #2c3e50, #4a6491);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .iframe-container.placeholder {
            background: linear-gradient(45deg, #2c3e50, #4a6491);
        }
        
        .iframe-container iframe {
            width: 100%;
            height: 100%;
            border: none;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .placeholder-content {
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .placeholder-content i {
            font-size: 3rem;
            margin-bottom: 15px;
            color: rgba(255, 255, 255, 0.4);
        }
        
        .iframe-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
            z-index: 2;
            pointer-events: none;
        }
        
        .card-title {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            z-index: 3;
            text-align: center;
            font-size: 1.4rem;
            font-weight: bold;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
        }
        
        .nav-dots {
            display: flex;
            justify-content: center;
            margin: 30px 0;
            gap: 15px;
        }
        
        .dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .dot::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background: var(--accent);
            transition: width 0.5s linear;
        }
        
        .dot.active::after {
            width: 100%;
        }
        
        .counter {
            text-align: center;
            font-size: 1.2rem;
            margin-top: 10px;
            opacity: 0.9;
            background: rgba(0, 0, 0, 0.2);
            padding: 8px 15px;
            border-radius: 20px;
            display: inline-block;
        }
        
        footer {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
            opacity: 0.7;
            font-size: 1.1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* 响应式设计 */
        @media (max-width: 1200px) {
            .iframe-card {
                flex: 0 0 calc(33.33% - 20px);
            }
        }
        
        @media (max-width: 900px) {
            .iframe-card {
                flex: 0 0 calc(50% - 20px);
            }
            
            h1 {
                font-size: 2.2rem;
            }
        }
        
        @media (max-width: 600px) {
            .iframe-card {
                flex: 0 0 calc(100% - 20px);
            }
            
            .controls {
                flex-direction: column;
                align-items: center;
            }
            
            h1 {
                font-size: 1.8rem;
            }
        }
        
        /* 加载动画 */
        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.7; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.7; }
        }
        
        .loading-animation {
            display: flex;
            gap: 8px;
        }
        
        .loading-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--accent);
            animation: pulse 1.5s infinite;
        }
        
        .loading-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .loading-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1><i class="fas fa-layer-group"></i> ThreeJs Demo 展示 </h1>
            <p class="subtitle">此实现使用智能加载技术：仅当前显示的页面会加载iframe内容，其他页面iframe会被清空以节省资源并提高性能</p>
            <div class="performance-info">
                <i class="fas fa-bolt"></i>
                <span>当前状态：<span id="statusText">仅加载可见页面内容</span></span>
                <div class="loading-animation" id="loadingAnimation" style="display: none;">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            </div>
        </header>
        
        <div class="controls">
            <button class="btn" id="prevBtn">
                <i class="fas fa-arrow-left"></i> 上一组
            </button>
            <button class="btn" id="nextBtn">
                下一组 <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        
        <div class="carousel-container">
            <div class="carousel" id="carousel"></div>
        </div>
        
        <div class="nav-dots" id="navDots"></div>
        <div class="counter" id="counter">1/3</div>
        
        <footer>
        </footer>
    </div>
       

`;




// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const navDots = document.getElementById('navDots');
    const counter = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const statusText = document.getElementById('statusText');
    const loadingAnimation = document.getElementById('loadingAnimation');

    let currentPage = 0;
    const itemsPerPage = 4;
    const pageCount = Math.ceil(maps.length / itemsPerPage);
    let activeIframes = new Set();

    // 生成预览卡片（初始为空占位符）
    maps.forEach((filename, index) => {
        const pageUrl = `./${filename}.html`;
        const title = titles[filename] || filename;

        const card = document.createElement('div');
        card.className = 'iframe-card';
        card.dataset.href = pageUrl;
        card.dataset.index = index;
        card.dataset.loaded = 'false';

        card.innerHTML = `
                    <div class="iframe-container placeholder">
                        <div class="placeholder-content">
                            <i class="fas fa-cloud-download-alt"></i>
                            <p>点击加载预览</p>
                        </div>
                    </div>
                    <div class="card-title">${title}</div>
                `;

        carousel.appendChild(card);

        // 添加点击事件
        card.addEventListener('click', () => {
            // 如果还未加载，先加载iframe
            if (card.dataset.loaded === 'false') {
                loadIframe(card, pageUrl);
            }
            // 等待加载完成后跳转
            setTimeout(() => {
                window.location.href = pageUrl;
            }, 300);
        });
    });

    // 加载iframe函数
    function loadIframe(card, url) {
        const container = card.querySelector('.iframe-container');
        container.classList.remove('placeholder');
        container.innerHTML = `<iframe src="${url}" loading="lazy"></iframe>`;
        card.dataset.loaded = 'true';
        activeIframes.add(card.dataset.index);

        // 更新状态
        statusText.textContent = `已加载: ${activeIframes.size}/${maps.length} 页面`;
    }

    // 卸载iframe函数
    function unloadIframe(card) {
        if (card.dataset.loaded === 'true') {
            const container = card.querySelector('.iframe-container');
            container.innerHTML = `
                        <div class="placeholder-content">
                            <i class="fas fa-cloud"></i>
                            <p>内容已卸载</p>
                        </div>
                    `;
            container.classList.add('placeholder');
            card.dataset.loaded = 'false';
            activeIframes.delete(card.dataset.index);

            // 更新状态
            statusText.textContent = `已加载: ${activeIframes.size}/${maps.length} 页面`;
        }
    }

    // 生成导航点
    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.page = i;

        dot.addEventListener('click', () => {
            goToPage(parseInt(dot.dataset.page));
        });

        navDots.appendChild(dot);
    }

    // 更新计数器
    function updateCounter() {
        counter.textContent = `${currentPage + 1}/${pageCount}`;

        // 更新激活的导航点
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    // 页面跳转函数
    function goToPage(page) {
        if (page < 0) page = pageCount - 1;
        if (page >= pageCount) page = 0;

        // 显示加载状态
        statusText.textContent = "正在加载页面...";
        loadingAnimation.style.display = "flex";

        setTimeout(() => {
            currentPage = page;
            const offset = -currentPage * 100;
            carousel.style.transform = `translateX(${offset}%)`;

            // 加载当前页的iframe
            const startIdx = currentPage * itemsPerPage;
            const endIdx = Math.min(startIdx + itemsPerPage, maps.length);

            // 卸载所有iframe
            document.querySelectorAll('.iframe-card').forEach(card => {
                unloadIframe(card);
            });

            // 加载当前页的iframe
            for (let i = startIdx; i < endIdx; i++) {
                const card = document.querySelector(`.iframe-card[data-index="${i}"]`);
                const filename = maps[i];
                const pageUrl = `./${filename}.html`;
                loadIframe(card, pageUrl);
            }

            updateCounter();

            // 隐藏加载状态
            loadingAnimation.style.display = "none";
            statusText.textContent = `已加载: ${activeIframes.size}/${maps.length} 页面`;
        }, 300);
    }

    // 初始加载第一页
    goToPage(0);

    // 按钮事件
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    // 添加键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
        if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    });

    // 响应式调整 - 每页显示数量
    function adjustItemsPerPage() {
        const width = window.innerWidth;
        let perPage = 4;

        if (width < 1200) perPage = 3;
        if (width < 900) perPage = 2;
        if (width < 600) perPage = 1;

        document.querySelectorAll('.iframe-card').forEach(card => {
            card.style.flex = `0 0 calc(${100/perPage}% - 20px)`;
        });

        // 重新计算页面数量
        const newPageCount = Math.ceil(maps.length / perPage);
        if (newPageCount !== pageCount) {
            // 重新生成导航点
            navDots.innerHTML = '';
            for (let i = 0; i < newPageCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === currentPage) dot.classList.add('active');
                dot.dataset.page = i;

                dot.addEventListener('click', () => {
                    goToPage(parseInt(dot.dataset.page));
                });

                navDots.appendChild(dot);
            }
            updateCounter();
        }
    }

    // 初始调整
    adjustItemsPerPage();

    // 监听窗口变化
    window.addEventListener('resize', adjustItemsPerPage);
});

