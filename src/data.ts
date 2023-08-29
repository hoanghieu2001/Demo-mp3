import { ISong } from './features/player.slice';

const data: ISong[] = [
    {
        id: 1,
        title: "Như phút ban đầu",
        singer: "Noo Phước Thịnh",
        cover: "",
        src: "src/mp3/Nhu-Phut-Ban-Dau-Noo-Phuoc-Thinh.mp3",
        img: "https://avatar-ex-swe.nixcdn.com/song/2018/11/21/f/d/3/3/1542796855179_640.jpg",
        album: "Như phút ban đầu",
    },
    {
        id: 2,
        title: "À lôi",
        singer: "D2T",
        cover: "",
        src: "src/mp3/ALoi-Double2TMasew-10119691.mp3",
        img: "https://duan24h.net/wp-content/uploads/2023/07/aloi-2.webp",
        album: "Dân tôc miền núi chất",
    },
    {
        id: 3,
        title: "Tại vì sao",
        singer: "MCK",
        cover: "",
        src: "src/mp3/TaiViSao-MCK-7963973.mp3",
        img: "https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/a/e/5/4/ae54e556fabe7740b12186c68cc95fd9.jpg",
        album: "Tlinh & Wxrdie",
    },
    {
        id: 4,
        title: "Thủ đô Cypher",
        singer: "RPT",
        cover: "",
        src: "src/mp3/ThuDoCypher-RPTOrijinnLowGRzmasRPTMCK-9038213.mp3",
        img: "https://i.ytimg.com/vi/yET2SBRuNm0/maxresdefault.jpg",
        album: "RPT"
    },
    {
        id: 5,
        title: "Baby Shark",
        src: "src/mp3/Nhac-chuong-Baby-Shark-mp3.mp3",
        singer: "Babylon",
        cover: "",
        img: "data:image/png;base64,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",
        album: "Nhạc trẻ em",
    },
    {
        id: 6,
        title: "Trú Mưa",
        singer: "HKT",
        cover: "",
        src: "/src/mp3/Tru-Mua-HKT.mp3",
        img: "https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/covers/4/c/4c99c999e0983f314e104c5821c48193_1299834031.jpg",
        album: "Tóc ngầu",
    },
    {
        id: 7,
        title: "Thêm 1 lần đau",
        singer: "HKT",
        cover: "",
        src: "/src/mp3/Them-Mot-Lan-Dau-HKT.mp3",
        img: "https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/covers/4/c/4c99c999e0983f314e104c5821c48193_1299834031.jpg",
        album: "Tóc ngầu"
    },
    {
        id: 8,
        title: "Cô gái xì teen",
        singer: "HKT",
        cover: "",
        src: "/src/mp3/Co-Gai-Xi-Teen-HKT.mp3",
        img: "https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/covers/4/c/4c99c999e0983f314e104c5821c48193_1299834031.jpg",
        album: "Tóc ngầu",
    },
    {
        id: 9,
        title: "Thêm 1 lần đau",
        singer: "HKT",
        cover: "",
        src: "/src/mp3/Them-Mot-Lan-Dau-HKT.mp3",
        img: "https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/covers/4/c/4c99c999e0983f314e104c5821c48193_1299834031.jpg",
        album: "Tóc ngầu",

    },
    {
        id: 10,
        title: "Xin đừng chạm vào tim anh",
        singer: "Duy Mạnh",
        cover: "",
        src: "/src/mp3/Xin Đừng Chạm Vào Anh - Duy Mạnh.mp3",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRgMaA98sbZFlz5NNdvGQp3GXrZKLcZ_jAQ&usqp=CAU",
        album: "Những con nghiện hoàn lương"
    },


]
export default data