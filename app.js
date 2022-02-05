// search bar


var searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', searchVideos);




//fetching API url for search
async function searchVideos() {
    try {
        console.log("hello")
        const key = 'AIzaSyAtNzwQXZ2QBvkMJk5XBAW3xa4NGCAdmWs'

        const inp = document.querySelector('.search-bar').value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${inp}&key=${key}&type=video&maxResults=20&part=snippet`)

        let data = await res.json()

        let array_of_videos = data.items;
        console.log(array_of_videos);

        makeVideoCard(array_of_videos);

    }
    catch (err) {
        console.log("err: ", err)
    }
}

var videoCardContainer = document.getElementsByClassName("video-container")[0];
function makeVideoCard(data) {

    videoCardContainer.innerHTML = null;
    data.forEach(function (data) {
        let video_div = document.createElement("div");
        video_div.classList = "video"

        let video_thumbnail = document.createElement("img")
        video_thumbnail.src = data.snippet.thumbnails.high.url
        video_thumbnail.classList = "thumbnail"
        video_thumbnail.addEventListener("click", () =>{
            let videoId=data.id.videoId;
            localStorage.setItem("videId", videoId);
            window.location.href="video.html"
        })

        let title_div = document.createElement("div");
        title_div.classList = "content"

        let chainal_thumbnail = document.createElement("img")
        // chainal_thumbnail.src = data.channelThumbnail
        chainal_thumbnail.classList = "channel-icon"

        let info_div = document.createElement("div")
        info_div.classList = "info"

        let h4 = document.createElement("h4")
        h4.classList = "title"
        h4.innerText = data.snippet.title

        let p = document.createElement("p");
        p.innerText = data.snippet.channelTitle
        p.classList = "channel-name"

        info_div.append(h4, p)
        title_div.append(chainal_thumbnail, info_div);

        video_div.append(video_thumbnail, title_div);
        videoCardContainer.appendChild(video_div);


    })
}


//for the popular video si india

popular();
async function popular(){
    let res=await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyAtNzwQXZ2QBvkMJk5XBAW3xa4NGCAdmWs&maxResults=20")

    let data=res.json();
    data.then((data) => {
        // console.log(data.items);
        makeVideoCard(data.items)
    })
    
}


