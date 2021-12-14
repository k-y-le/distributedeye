class Video {
    constructor(filePath) {
        this.filePath = filePath;
        this.width;
        this.height;
        this.vid;
    }

    loadVideo() {
        this.vid = createVideo(this.filePath);
        this.vid.hide();
        this.resizeVideo();
    }

    resizeVideo() {
        let ran = Math.floor(Math.random() * 2 + 1);
        this.height = this.vid.height / ran;
        this.width = this.vid.width / ran;
    }

    // silence() {
    //     this.vid.volume(0);
    // }
}

// create arrays
var detox = [];
var del = [];
var meta = [];
var glance = [];
var scrolls = [];
var messages = [];
var google = [];
var recycle = [];
var data = [];
var google = [];

//other global
let ran = Math.floor(Math.random() * glance.length);

// make array to store footage for each repteated cycle
var footage = [];

function preload() {
    // detox
    for (i = 0; i < 8; i++) {
        detox.push(new Video('/detox_' + (i + 1) + '.mp4'));
        detox[i].loadVideo();
    }
    // delete
    for (i = 0; i < 10; i++) {
        del.push(new Video('/delete_' + (i + 1) + '.mov'));
        del[i].loadVideo();
    }
    // meta
    for (i = 0; i < 14; i++) {
        meta.push(new Video('/meta_' + (i + 1) + '.mp4'));
        meta[i].loadVideo();
    }
    //glances
    for (i = 0; i < 60; i++) {
        glance.push(loadImage('/glance_' + (i + 1) + '.png'));
    }
    // scroll
    for (i = 0; i < 15; i++) {
        scrolls.push(new Video('/scroll_' + (i + 1) + '.mov'));
        scrolls[i].loadVideo();
    }
    // messages
    for (i = 0; i < 15; i++) {
        messages.push(new Video('/messages_' + (i + 1) + '.mov'));
        messages[i].loadVideo();
    }
    // google
    for (i = 0; i < 5; i++) {
        google.push(new Video('/google_' + (i + 1) + '.mp4'));
        google[i].loadVideo();
    }
    // // recycle
    // for (i = 0; i < 4; i++) {
    //     recycle.push(new Video('/cycle_' + (i + 1) + '.mov'));
    //     recycle[i].silence();
    //     recycle[i].loadVideo();
    // }
    // data
    for (i = 0; i < 3; i++) {
        data.push(new Video('/data_' + (i + 1) + '.mp4'));
        data[i].loadVideo();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight); // canvas size of entire page
    //placeholder
    placeholder = createVideo('/placeholder.mov');
    placeholder.hide(); // a black placeholder video to get past autoplay blockers

    fillFootage();
}

// let vidCounter = 0;
function draw() {
    spooky();
}

let loopCount = 0;
let r = [];
function spooky() {
    // let numVids = 8;
    // let timeBetweenVids = 2;
    let totalLength = 100;
    time = millis() / 1000;
    background(0);     // set background color white or black

    // position and play each clip in cycle[]
    // using footage
    // if (time % 20 > 3) {
    //     // draw first video
    //     playVid(0);
    // }
    // if (time % 20 > 5) {
    //     playVid(1);
    // }
    // if (time % 20 > 7) {
    //     playVid(2);
    // }

    // if (time % 20 > 8) {
    //     playVid(3);
    // }
    for (let i = 0; i < (time % totalLength) / totalLength * 8; i++) {
        //print(i);
        playVid(i);
    }

    if (time % totalLength > totalLength - 4) {
        // hide/stop all videos
        for (i = 0; i < 3; i++) {
            footage[i].vid.hide();
        }
        background(255);
    }

    if (time % totalLength > totalLength - 3.5) {
        let margin = 100;
        push();
        imageMode(CENTER);
        let shortWindow = min(windowWidth, windowHeight) - margin;
        let r = glance[ran].width / glance[ran].height;
        // let hmargin = wmargin * glance[ran].height / glance[ran].width;
        image(glance[ran], windowWidth / 2, windowHeight / 2, r * shortWindow, shortWindow);
        pop();
    }

    // increment time for loop
    if (time / 20 > loopCount) {
        loopCount++;
        // new glanceback for next
        ran = Math.floor(Math.random() * 30);
        // repopulate footage[] for next
        fillFootage();

        r = [];
        for (let i = 0; i < 8 * 3; i++) {
            r.push(random());
        }
    }
}

function playVid(i) {
    print(footage[i].filePath);
    // let ratio = ;
    let w = footage[i].vid.width * r[i * 3];
    let h = footage[i].vid.height * r[i * 3];

    if (w < 200) {
        w = 200;
        h = w * footage[i].vid.height / footage[i].vid.width;
    } else if (h < 200) {
        h = 200;
        w = h * footage[i].vid.weight / footage[i].vid.height;
    }


    let x = (width - w) * r[i * 3 + 1];
    let y = (height - h) * r[i * 3 + 2];
    image(footage[i].vid, x, y, w, h);
    footage[i].vid.play();
}

function mousePressed() {
    placeholder.play(); // TODO: change this to a black screen for like 2 seconds
}

function fillFootage() {
    footage = [];
    // delete 1
    footage.push(del[Math.floor(Math.random() * (del.length))]);
    // scrolls 2
    footage.push(scrolls[Math.floor(Math.random() * (scrolls.length))]);
    // interfaces - google or meta 
    let r = Math.floor(Math.random() * 1);
    if (r == 1) {
        footage.push(google[Math.floor(Math.random() * (google.length))])
    } else footage.push(meta[Math.floor(Math.random() * (meta.length))]);
    // messages 1
    footage.push(messages[Math.floor(Math.random() * (messages.length))]);
    // messages 2
    footage.push(messages[Math.floor(Math.random() * (messages.length))]);
    // stock - detox or data, TODO add recycle
    r = Math.floor(Math.random() * 1);
    if (r == 1) {
        footage.push(detox[Math.floor(Math.random() * (detox.length))])
    } else footage.push(data[Math.floor(Math.random() * (data.length))]);
    // scrolls 2
    footage.push(scrolls[Math.floor(Math.random() * (scrolls.length))]);
    //interfaces - google or 
    r = Math.floor(Math.random() * 1);
    if (r == 1) {
        footage.push(google[Math.floor(Math.random() * (google.length))])
    } else footage.push(meta[Math.floor(Math.random() * (meta.length))]);
    //console.log(footage);
}



// NEXT TIME
// * stock videos have a max size (make them smaller)
// * messages have a min size (make them bigger)
// * delete audio for mp4 files