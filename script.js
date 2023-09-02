const handleData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const allCategory = data.data;
    // console.log(allCategory);

    const categoryNameSection = document.getElementById('category-name-section');
    allCategory.forEach(category => {
        // console.log(category.category_id);
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab text-2xl" onclick = "categoryClick(${category.category_id})">${category.category}</a>
        `
        categoryNameSection.appendChild(div);
    });
}

const categoryClick = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    // console.log(categoryId);
    const videoContentCard = document.getElementById('video-card');
    videoContentCard.innerHTML = "";

    const empty = document.getElementById('empty-content');
    if (data.data.length === 0) {
        empty.classList.remove('hidden')
    } else {
        empty.classList.add('hidden')
    }

    data.data.forEach(video => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card  bg-base-100 shadow" >
                    <div>
                        <figure class="h-48"><img class ="w-full h-full" src="${video?.thumbnail}" alt="Shoes" /></figure>
                        <p id="post-date"></p>
                    </div>
                    <div class=" p-4 flex flex-row gap-3">
                        <div class=" ">
                            <img class="rounded-full w-14 h-14" src="${video?.authors[0]?.profile_picture}" alt="">
                        </div>
                        <div class="space-y-2">
                            <h2 class="card-title font-bold">${video.title}</h2>
                            <div class="flex flex-row content-center gap-1">
                                <p>${video?.authors[0]?.profile_name}</p>
                                 <img id="blue-badge" class="h-6 hidden" src="blue-badge.png" alt="">
                            </div>
                            <p>${video?.others?.views}</p>
                        </div>
                    </div>
                </div>
        `
        videoContentCard.appendChild(div);
        // console.log(video.authors[0].verified);
    })
};


const blogBtn = () => {
    window.location.href = 'blog/blog.html'
}

handleData();
categoryClick(1000);