import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import playerSlice from "./features/player.slice.ts";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// import Layout from './layout.tsx';

import React from 'react';
import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';



import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
const { Content, Sider } = Layout;

const items1: MenuProps['items'] = ['kham pha', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `fdsfs ${key}`,
      icon: React.createElement(icon),
      label: `Khám phá `,


      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);


// App này của thư viện ant e ko biết đổi là gì cho đc :((
const App1: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
}

// sidebar
const sidebar1: MenuItem[] = [
  {
    label: 'Zing chat',
    style: { color: "font-size:23px" },
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Bookmark',
            icon: 'pi pi-fw pi-bookmark'
          },
          {
            label: 'Video',
            icon: 'pi pi-fw pi-video'
          }
        ]
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash'
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-external-link'
      }
    ]
  },
  {
    label: 'Khám phá',
    icon: 'pi pi-fw pi-pencil',
    items: [
      {
        label: 'Left',
        icon: 'pi pi-fw pi-align-left'
      },
      {
        label: 'Right',
        icon: 'pi pi-fw pi-align-right'
      },
      {
        label: 'Center',
        icon: 'pi pi-fw pi-align-center'
      },
      {
        label: 'Justify',
        icon: 'pi pi-fw pi-align-justify'
      }
    ]
  },
  {
    label: 'Radio',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-user-plus'
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-user-minus'
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Filter',
            icon: 'pi pi-fw pi-filter',
            items: [
              {
                label: 'Print',
                icon: 'pi pi-fw pi-print'
              }
            ]
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'List'
          }
        ]
      }
    ]
  },
  {
    label: 'Thư viện',
    icon: 'pi pi-fw pi-calendar',
    items: [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Save',
            icon: 'pi pi-fw pi-calendar-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-calendar-minus'
          }
        ]
      },
      {
        label: 'Archive',
        icon: 'pi pi-fw pi-calendar-times',
        items: [
          {
            label: 'Remove',
            icon: 'pi pi-fw pi-calendar-minus'
          }
        ]
      }
    ]
  }
];



function App() {
  const dispatch = useAppDispatch();

  const playerRef = useRef<HTMLAudioElement>(new Audio());
  const currentTimeRef = useRef<HTMLSpanElement | null>(null);
  const durationRef = useRef<HTMLSpanElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);
  const volumeRef = useRef<HTMLInputElement | null>(null);


  const { songs, currentSong, isPlaying, loop, } = useAppSelector(
    (state) => state.player
  );

  // console.log(currentSong);
  useEffect(() => {
    if (currentSong) {
      playerRef.current.src = currentSong.src;
      playerRef.current.load();
      // console.log('check current')
    }
  }, [currentSong]);
  //Effect nafy ddang k chạy do có hàm set curentSong đâu. curentSong ban đầu là null => dependencise này k bgio thay đổi.
  //Do k có hàm set currentSong. 

  useEffect(() => {
    if (!currentSong) return;  //currentSong có giá trị ban đầu là null => cáii effect này k bgio được chạy. vì n return luôn

    if (isPlaying) {
      playerRef.current.paused && playerRef.current.play();
    } else {
      playerRef.current.played && playerRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  //
  useEffect(() => {
    const onDurationChange = () => {
      durationRef.current &&
        (durationRef.current.textContent = `${formatTime(Math.floor(playerRef.current.duration))}`);
      // ...
    };

    const onTimeUpdate = () => {
      currentTimeRef.current &&
        (currentTimeRef.current.textContent = formatTime(Math.floor(playerRef.current.currentTime)));
      // ...
    };






    // ...

    // Hàm để chuyển đổi thời gian từ giây sang định dạng phút:giây
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const onVolumeChange = () => {
      if (volumeRef.current) {
        volumeRef.current.value = String(playerRef.current.volume);
      }

      console.log(playerRef.current.volume);
    };
    const onEnded = () => {
      dispatch(playerSlice.actions.next());
    };

    playerRef.current.addEventListener("durationchange", onDurationChange);

    playerRef.current.addEventListener("timeupdate", onTimeUpdate);

    playerRef.current.addEventListener("ended", onEnded);

    return () => {
      playerRef.current.removeEventListener("durationchange", onDurationChange);
      playerRef.current.removeEventListener("timeupdate", onTimeUpdate);
      playerRef.current.removeEventListener("ended", onEnded);
      playerRef.current.removeEventListener("volumechange", onVolumeChange);

    };
  }, []);





  return (
    <div className="music row" style={{ color: "#FFF" }}>
      <div className="col-2">
        <div className="card flex justify-content-center">
          <PanelMenu model={sidebar1} className="w-full md:w-25rem" />
        </div>
      </div>
      <div className="main col-10">
        <Layout className='main' style={{ minHeight: "100vh", }}>
          {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header> */}
          <Layout>
            {/* <Sider width={200} style={{}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Sider> */}

            <Layout style={{ padding: 0 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>

                <ArrowLeftOutlined style={{ fontSize: 24, marginRight: 12, color: "#ffff" }} />
                <ArrowRightOutlined style={{ fontSize: 24, color: "#fff" }} />
                <input style={{ width: 440, height: 40, borderRadius: 40 }} type="text" placeholder='Tìm kiếm bài hát, lời bài hát,...' />
              </Breadcrumb>
              <Content
                style={{
                  padding: 0,
                  margin: 0,
                  minHeight: 280,
                  background: "colorBgContainer",
                }}
              >
                <div className="row" style={{ display: "flex", justifyContent: "right" }}>
                  {songs.map((song) => (
                    <div key={song.id} onClick={() => dispatch(playerSlice.actions.setSong(song.id))}>
                      {currentSong?.id === song.id && (
                        <div className="row">
                          <div className="col-4 text-center" style={{ backgroundColor: "#461974" }}>
                            <img className='mw-100' style={{ width: '300px', height: "300px", borderRadius: "25px" }} src={song.img} alt="" />

                          </div>
                          <div className="col-8 " style={{ backgroundColor: "#461974", padding: 0 }}>
                            <div className="title " style={{ color: '#fff' }}>
                              <h5>Lời tựa của ngôi sao Vpop hiện nay</h5>
                              <div className="row" style={{ color: "#fff" }}>
                                <div className="col-5">
                                  <h5>Bài hát</h5>
                                </div>
                                <div className="col-5">
                                  <h5>Album</h5>
                                </div>
                                <div className="col-2 " >
                                  <h5 style={{ float: "right", marginRight: "20px" }}>
                                    Thời gian
                                  </h5>
                                </div>
                              </div>
                              <div className="row">
                                {songs.map((song) => (
                                  <div style={{ height: 62 }}
                                    key={song.id}
                                    onClick={() => dispatch(playerSlice.actions.setSong(song.id))}
                                  >
                                    <h5>

                                      {/* {song.title} {currentSong?.id == song.id && "(Đang phát)"} */}

                                    </h5><div className="row">
                                      <div className="col-5" style={{ display: "flex" }}>
                                        <i className="bi bi-music-note-beamed pe-2 pt-2" ></i>
                                        <img className='mw-100' style={{ width: 40, height: 40 }} src={song.img} alt="" />
                                        <div className="song">
                                          <p className="title-music ps-2" style={{}} >{song.title} {currentSong?.id == song.id && "(Đang phát)"}</p>
                                          <p className='title-song' style={{ position: "relative", top: -15, left: 9 }} >{song.singer} </p>
                                        </div>
                                      </div>
                                      <div className="col-4">
                                        <span>Time</span>

                                      </div>
                                      <div className="col-3">

                                      </div>
                                    </div>




                                  </div>
                                ))}
                                <div className="col-4">dfsd</div>


                              </div>
                            </div>
                          </div>


                        </div>


                      )}
                    </div>
                  ))}


                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>

        <div>
          <div className="App" style={{ width: '100%' }}>

          </div  >

        </div >

      </div >

      <div
        className="list-item row "
        style={{
          position: "fixed",
          bottom: "0px",
          backgroundColor: "#170f23",
          height: 100,
          color: "aliceblue",
          width: "1520px",
        }}
      >

        <div className="item col-4 row ">
          <div className="col-3">
            <div>
              {songs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => dispatch(playerSlice.actions.setSong(song.id))}
                >
                  {currentSong?.id === song.id && (
                    <div>
                      <img className="app-img"
                        src={song.img} alt="ngu dốt"
                        style={{ width: 95, height: 95, borderRadius: 50, padding: 6, color: '#fff' }}
                      />
                      {/* Hiển thị các thông tin khác của bài hát */}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
          <div className="col-4 pt-4">


            <div className="left-footer">
              {songs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => dispatch(playerSlice.actions.setSong(song.id))}
                >
                  {currentSong?.id === song.id && (
                    <div className="flex">


                      <div className="info-song">
                        <h6>{song.title}</h6>
                        <p>{song.singer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-1 text-center "
            style={{ marginTop: 35 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </div>
        </div>
        <div className="item col-4 " style={{ paddingTop: 35 }}>
          <div className="container row">
            <div className="col-2dot4">
              <i className="bi bi-shuffle" onClick={() => dispatch(playerSlice.actions.toggleShuffle())} />


            </div>
            <div className="col-2dot4">

              <i onClick={() => dispatch(playerSlice.actions.prev())} className="bi bi-skip-start" />
            </div>
            <div className="col-2dot4">
              <a onClick={() => dispatch(playerSlice.actions.togglePlay())}>
                {isPlaying ? <i className="bi bi-stop"></i> : <i className="bi bi-play" />}
              </a>
            </div>
            <div className="col-2dot4">
              <i className="bi bi-skip-end" onClick={() => dispatch(playerSlice.actions.next())} />
            </div>
            <div className="col-2dot4">
              <i className="bi bi-arrow-left-right" onClick={() => dispatch(playerSlice.actions.toggleLoop(!loop))} />

            </div>

          </div>
        </div>
        <div className="item col-2 " style={{ paddingTop: "30px" }}>
          <div>
            <span ref={currentTimeRef}>00:00</span>
            <input

              ref={timeRef}
              type="range"
              onChange={(e) => {
                playerRef.current.currentTime = +e.target.value;
              }}
            />
            <span ref={durationRef}>00:00</span>
          </div>
        </div>
        <div className="col-2" style={{ paddingTop: 33 }}>
          <i className="bi bi-volume-up-fill"></i>
          <input
            ref={volumeRef}
            type="range"
            min={0}
            max={1}
            step={0.05}
            onChange={(e) => {
              playerRef.current.volume = +e.target.value;
            }}
          />
          <i className="bi bi-music-note-beamed"></i>
        </div>
      </div>
    </div>


  );
}



export default App;
