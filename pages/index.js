import moment from "moment";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import {
  BottomSheet,
  CustomButton,
  CustomModal,
  CustomText,
  FlexBox,
  InputBox,
  CopyWindow,
  UploadImage,
  Window,
} from "../component";
import { needUpdateState, storageListState } from "../lib/data/atom";
import { colorStyle, randomImgList } from "../lib/data/styleData";

import { storageUtil } from "../lib/util";
import { MdArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { AppInfo } from "../component/main/AppInfo";
import { BorderBox, BorderLine } from "../component/GlobalStyles";

const BackgroundContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "space-between",
})`
  height: 100vh;
  width: 100vw;
  max-width: 500px;
  position: relative;
  background: ${colorStyle.windowBackColor};
`;

const ContentContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  flex-wrap: wrap;
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 0;
  width: 100%;
  height: 33vh;
  overflow: hidden;
`;

const FolderContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "center",
})`
  margin: 10px 0;
  color: ${colorStyle.white};
`;

const ControlBar = styled(FlexBox).attrs({
  align: "flex-start",
})`
  min-height: 30px;
  width: 100%;
  background: ${colorStyle.backgroundColor};
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: ${colorStyle.white};
  padding: 2px;
  position: absolute;
  bottom: 0;
  z-index: 5;
  box-sizing: border-box;
`;

const StartBtn = styled(BorderBox)``;

const ParentsMenuContainer = styled(BorderBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  width: 50%;
  position: absolute;
  top: -254px;
  z-index: 55;
  padding: 0;
`;

const ChildMenuContainer = styled(BorderBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 15;
  min-width: 80%;
  padding: 0;
`;

const ParentsMenuItem = styled(FlexBox).attrs({
  justify: "space-between",
})`
  background: ${(props) => props.backcolor};
  width: 100%;
  min-height: 50px;
  margin: 0;
`;

const ChildMenuItem = styled(FlexBox).attrs({
  justify: "flex-start",
})`
  background: ${colorStyle.backgroundColor};
  min-height: 40px;
  position: relative;
  z-index: 15;
  padding-right: 5px;
`;

export default function MainScreen({ navigation, route }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowChildMenu, setIsShowChildMenu] = useState("");
  const [introWindowVisible, setIntroWindowVisible] = useState(true);
  const [introWindowDelete, setIntroWindowDelete] = useState(false);
  const [inputWindowVisible, setInputWindowVisible] = useState(false);
  const [inputWindowDelete, setInputWindowDelete] = useState(true);
  const [appInfoVisible, setAppInfoVisible] = useState(false);
  const [appInfoDelete, setAppInfoDelete] = useState(false);

  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [pageIdx, setPageIdx] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [permissionStatus, requestPermission] = useState(false); //MediaLibrary 에서 동의
  const photoSelArr = ["기본 사진 선택", "사진 라이브러리에서 선택"];
  const [imgManageIdx, setImgManageIdx] = useState(0);
  const [storageData, setStorageData] = useRecoilState(storageListState);
  const resetStorage = useResetRecoilState(storageListState);
  const [isPhotoBtnClicked, setIsPhotoBtnClicked] = useState(false);

  const [inputFocused, setInputtFocused] = useState(false);
  const [btsVisible, setBtsVisible] = useState(false);
  const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateState);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const pageArr = [
    {
      id: 0,
      title: "이름",
      placeholder: "예)구은재",
      value: nameText,
      setFunc: setNameText,
      inputMode: "default",
      buttonType: "next",
    },
    {
      id: 1,
      title: "지역",
      placeholder: "예)동해",
      value: locationText,
      setFunc: setLocationText,
      inputMode: "default",
      buttonType: "next",
    },
    {
      id: 2,
      title: "생일",
      placeholder: "예)19970324",
      value: birthdayText,
      setFunc: setBirthdayText,
      inputMode: "numeric",
      buttonType: "next",
    },
    {
      id: 3,
      title: "사진",
      value: photoSrc,
      setFunc: setPhotoSrc,
      buttonType: "done",
    },
  ];

  const menuArr = [
    {
      id: 0,
      name: "Programs",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Programs",
          icon: "images/icons/no_permission.png",
        },
      ],
      icon: "images/icons/programs.png",
    },
    {
      id: 1,
      name: "Find",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Find",
          icon: "images/icons/no_permission.png",
        },
      ],
      icon: "images/icons/find_file.png",
    },
    {
      id: 2,
      name: "New",
      child: [
        {
          id: 0,
          name: "Name",
          icon: "images/icons/file_pencil.png",
          nav: "NewNameMain",
          parents: "New",
        },
        {
          id: 1,
          name: "ID Card",
          icon: "images/icons/bear.png",
          parents: "New",
          nav: "setInputWindowVisible",
        },
      ],
      icon: "images/icons/new.png",
    },
    {
      id: 3,
      name: "App Info",
      child: null,
      nav: "AppInfoMain",
      icon: "images/icons/help.png",
    },
    {
      id: 4,
      name: "Settings",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Settings",
          icon: "images/icons/no_permission.png",
        },
      ],
      icon: "images/icons/settings.png",
    },
  ];

  useEffect(() => {
    const getStorageData = async () => {
      const data = await storageUtil.getData();

      if (Array.isArray(data) && data.length > 0) setStorageData(data);
      setNeedUpdate(false);
    };
    // console.log("##route.params", route?.params);
    // if (
    //   (route.params &&
    //     Object.prototype.hasOwnProperty.call(route.params, "needUpdate") &&
    //     route.params.needUpdate) ||
    //   needUpdate
    // ) {
    //   getStorageData();
    // }
    if (needUpdate) {
      getStorageData();
    }
  }, [needUpdate]);

  useEffect(() => {
    console.log("##appInfoVisible", appInfoVisible);
  }, [appInfoVisible]);

  useEffect(() => {
    //nameFunc();
    return () => {
      setNeedUpdate(false);
      setIsShowMenu(false);
      setInputWindowDelete(true);
      setNameText("");
      setLocationText("");
      setBirthdayText("");
      setPhotoSrc("");
    };
  }, []);

  useEffect(() => {
    if (!isShowMenu) setIsShowChildMenu("");
  }, [isShowMenu]);

  useEffect(() => {
    if (introWindowDelete) setIntroWindowVisible(false);
  }, [introWindowDelete]);

  useEffect(() => {
    if (inputWindowDelete) {
      setPageIdx(0);
      setInputWindowVisible(false);
      setNameText("");
      setLocationText("");
      setBirthdayText("");
      setPhotoSrc("");
    }
  }, [inputWindowDelete]);

  useEffect(() => {
    let isValidBirth = moment(birthdayText, "YYYYMMDD", true).isValid();

    if (
      (pageIdx === 0 && nameText.trim() === "") ||
      (pageIdx === 1 && locationText.trim() === "") ||
      (pageIdx === 2 && (birthdayText.trim() === "" || !isValidBirth)) ||
      (pageIdx === 3 && photoSrc === "")
    )
      setNextDisabled(true);
    else setNextDisabled(false);

    if (!isValidBirth)
      setBirthdayError("생년월일을 8자리 정수 형식으로 입력해주세요.");
    else setBirthdayError("");
  }, [pageIdx, locationText, nameText, birthdayText, photoSrc]);

  useEffect(() => {
    if (inputWindowVisible) setInputWindowDelete(false);
  }, [inputWindowVisible]);

  useEffect(() => {
    if (
      isPhotoBtnClicked &&
      (permissionStatus.granted || permissionStatus.status === "granted")
    )
      setBtsVisible(true);
  }, [permissionStatus]);

  const handleSelectPhoto = () => {
    if (
      !permissionStatus.granted ||
      permissionStatus.status === "undetermined"
    ) {
      setIsPhotoBtnClicked(true);
      requestPermission();
    } else {
      setBtsVisible(true);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   setPhotoSrc(result.assets[0].uri);
    //   setBtsVisible(false);
    // }
  };

  const handleBts = (idx) => {
    setImgManageIdx(idx);
    if (idx === 0) {
      setPhotoSrc(() => {
        const leng = randomImgList.length;
        const idx = Math.floor(Math.random() * (leng - 0));
        return idx;
      });
      setBtsVisible(false);
    } else if (idx === 1) pickImage();
  };

  const dragBackground = useRef(null);
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
  const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
  const [pos, setPos] = useState({ left: 0, top: 0 }); // 실제 drag할 요소가 위치하는 포지션값

  return (
    <>
      <BackgroundContainer
        onClick={() => {
          // if (isShowMenu)
          //   setIsShowMenu(false); //todo: need?
          if (inputFocused) {
            //Keyboard.dismiss();
          }
        }}
        ref={dragBackground}
      >
        <ContentContainer>
          <FolderContainer
            onClick={async () => {
              await storageUtil.clearAll();
              resetStorage();
            }}
          >
            <img
              src="images/icons/bin_filled.png"
              style={{
                width: 32,
                height: 32,
                marginBottom: 2,
              }}
            />
            <FlexBox style={{ width: 80 }} justify="center">
              <CustomText color={colorStyle.white}>휴지통</CustomText>
            </FlexBox>
          </FolderContainer>
          {storageData &&
            Array.isArray(storageData) &&
            storageData.map((data, idx) => {
              return (
                <FlexBox
                  onClick={() => {
                    const params = { ...data, index: idx };
                    navigation.navigate("FolderContent", params);
                  }}
                  key={data.number + data.name}
                  direction="column"
                  style={{ marginBottom: 10, marginLeft: 10 }}
                >
                  <img
                    src="images/icons/folder_32.png"
                    style={{
                      width: 32,
                      height: 32,
                      marginBottom: 2,
                    }}
                  />
                  <FlexBox style={{ width: 80 }} justify="center">
                    <CustomText
                      color={colorStyle.white}
                      style={{
                        textOverflow: "ellipsis",
                        width: 80,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                      ellipsizeMode="tail"
                    >
                      {data.name}
                    </CustomText>
                  </FlexBox>
                </FlexBox>
              );
            })}
        </ContentContainer>

        {inputWindowVisible ? (
          <FlexBox
            style={{
              position: "absolute",
              zIndex: 50,
              top: "33%vh",
              left: 55,
              width: "100%",
            }}
          >
            <CopyWindow
              introWindowVisible={inputWindowVisible}
              setIntroWindowVisible={setInputWindowVisible}
              setIntroWindowDelete={setInputWindowDelete}
              msg={
                <>
                  <FlexBox
                    direction="column"
                    justify="center"
                    style={{ padding: 10 }}
                  >
                    {pageArr.map((pageItem, idx) => {
                      if (pageIdx === pageItem.id)
                        return (
                          <Fragment key={idx + ". " + pageItem.title}>
                            {pageItem.id < 3 && (
                              <InputBox
                                title={pageItem.title}
                                changeCallback={pageItem.setFunc}
                                textValue={pageItem.value}
                                placeholder={pageItem.placeholder}
                                inputMode={pageItem.inputMode}
                                onFocus={(e) => {
                                  setInputtFocused(true);
                                }}
                                onBlur={(e) => {
                                  setInputtFocused(false);
                                }}
                                autoFocus={true}
                              />
                            )}
                            {pageItem.id === 2 && birthdayError !== "" && (
                              <FlexBox style={{ padding: 5 }}>
                                <CustomText color={colorStyle.warningColor}>
                                  {birthdayError}
                                </CustomText>
                              </FlexBox>
                            )}
                            {pageItem.id === 3 && (
                              <FlexBox
                                style={{ width: "100%", marginBottom: 20 }}
                              >
                                <UploadImage />
                                {/*
                                    <FlexBox style={{ padding: 20 }} onClick={handleSelectPhoto}>
                                      <img src={camera} width={24} />
                                    </FlexBox>
                                  
                                  <input type="file" accept="image/*" /> */}
                                {photoSrc !== "" ? (
                                  <img
                                    src={
                                      imgManageIdx === 0
                                        ? randomImgList[photoSrc]
                                        : { uri: photoSrc }
                                    }
                                    style={{
                                      width: 100,
                                      height: 100,
                                      marginRight: 5,
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </FlexBox>
                            )}
                            <FlexBox>
                              {pageItem.id !== 0 && (
                                <>
                                  <CustomButton
                                    text="prev"
                                    pressCallback={() => {
                                      setPageIdx(idx - 1);
                                    }}
                                  />
                                  <FlexBox
                                    style={{ width: 100, height: 10 }}
                                  ></FlexBox>
                                </>
                              )}
                              <CustomButton
                                text={pageItem.buttonType}
                                pressCallback={() => {
                                  if (pageItem.buttonType === "done") {
                                    navigation.navigate("IdCardMain", {
                                      name: nameText,
                                      photoIdx: imgManageIdx,
                                      photo: photoSrc,
                                      location: locationText,
                                      birthday: birthdayText,
                                    });
                                    setInputWindowDelete(true);
                                  } else setPageIdx(idx + 1);
                                }}
                                disabled={nextDisabled}
                              />
                            </FlexBox>
                          </Fragment>
                        );
                    })}
                  </FlexBox>
                </>
              }
              title="입력해주세요."
              icon="images/icons/keyboard.png"
            />
          </FlexBox>
        ) : (
          <></>
        )}

        {/* {introWindowVisible ? (
          <FlexBox
            style={{
              position: "absolute",
              zIndex: 4,
              top: "40%",
              left: "10%",
              width: "100%",
            }}
          >
            <CopyWindow
              introWindowVisible={introWindowVisible}
              setIntroWindowVisible={setIntroWindowVisible}
              setIntroWindowDelete={setIntroWindowDelete}
              msg={
                <FlexBox style={{ padding: 10 }} direction="column">
                  <CustomText>{"새 이름을 원할 경우"}</CustomText>
                  <CustomText fontWeight="bold">
                    {"Start > New > Name"}
                  </CustomText>
                  <CustomText>{""}</CustomText>
                  <CustomText>{"새 신분증을 원할 경우"}</CustomText>
                  <CustomText fontWeight="bold">
                    {"Start > New > ID Card"}
                  </CustomText>
                </FlexBox>
              }
              icon="images/icons/hand.png"
              title="반가워요!"
            />
          </FlexBox>
        ) : (
          <></>
        )} */}

        {introWindowVisible ? (
          <Window
            introWindowVisible={introWindowVisible}
            setIntroWindowVisible={setIntroWindowVisible}
            setIntroWindowDelete={setIntroWindowDelete}
            msg={
              <FlexBox style={{ padding: 10 }} direction="column">
                <CustomText>{"새 이름을 원할 경우"}</CustomText>
                <CustomText fontWeight="bold">
                  {"Start > New > Name"}
                </CustomText>
                <CustomText>{""}</CustomText>
                <CustomText>{"새 신분증을 원할 경우"}</CustomText>
                <CustomText fontWeight="bold">
                  {"Start > New > ID Card"}
                </CustomText>
              </FlexBox>
            }
            icon="images/icons/hand.png"
            title="반가워요!"
            pos={pos}
            setPos={setPos}
            originPos={originPos}
            clientPos={clientPos}
            setOriginPos={setOriginPos}
            setClientPos={setClientPos}
          />
        ) : (
          <></>
        )}
        <ControlBar>
          <StartBtn
            onClick={() => {
              setIsShowMenu((prev) => !prev);
            }}
          >
            <img
              src="images/icons/window_logo.png"
              style={{ width: 24, height: 24, marginRight: 3 }}
            />
            <CustomText>Start</CustomText>
          </StartBtn>

          {!introWindowDelete ? (
            <StartBtn
              onClick={() => {
                setIntroWindowVisible((prev) => !prev);
              }}
              style={{ marginLeft: 5 }}
            >
              <img
                src="images/icons/hand.png"
                style={{ width: 24, height: 24, marginRight: 3 }}
              />
              <CustomText style={{ paddingLeft: 3 }}>{"반가워요!"}</CustomText>
            </StartBtn>
          ) : (
            <></>
          )}

          {!inputWindowDelete ? (
            <StartBtn
              onClick={() => {
                setInputWindowVisible((prev) => !prev);
              }}
              style={{ marginLeft: 5 }}
            >
              <img
                src="images/icons/keyboard.png"
                width={24}
                style={{ marginRight: 3 }}
              />
              <CustomText style={{ paddingLeft: 3 }}>{"입력해..."}</CustomText>
            </StartBtn>
          ) : (
            <></>
          )}

          {isShowMenu ? (
            <ParentsMenuContainer>
              {menuArr.map((menuItem) => {
                return (
                  <Fragment key={menuItem.id + menuItem.name}>
                    {menuItem.name === "New" ? <BorderLine /> : <></>}
                    <ParentsMenuItem
                      onClick={() => {
                        if (menuItem.nav) {
                          setIsShowMenu(false);
                          setInputWindowDelete(true);

                          setAppInfoVisible((prev) => !prev);
                        } else if (menuItem.child)
                          setIsShowChildMenu(menuItem.name);
                      }}
                      key={menuItem.id + menuItem.name}
                      backcolor={
                        menuItem.name === isShowChildMenu
                          ? colorStyle.headerColor
                          : colorStyle.backgroundColor
                      }
                    >
                      <FlexBox>
                        <img
                          src={menuItem.icon}
                          width={24}
                          style={{
                            marginLeft: 5,
                            marginRight: 5,
                          }}
                        />
                        <CustomText
                          color={
                            menuItem.name === isShowChildMenu
                              ? colorStyle.white
                              : colorStyle.black
                          }
                        >
                          {menuItem.name}
                        </CustomText>
                      </FlexBox>

                      {menuItem.child ? (
                        <>
                          <MdArrowRight size={24} />
                          {isShowChildMenu === menuItem.child[0].parents ? (
                            <ChildMenuContainer>
                              {menuItem.child.map((childItem, idx) => {
                                return (
                                  <Fragment key={childItem.id + childItem.name}>
                                    {Object.prototype.hasOwnProperty.call(
                                      childItem,
                                      "nav"
                                    ) ? (
                                      <ChildMenuItem
                                        onClick={() => {
                                          setIsShowMenu(false);
                                          if (storageData.length < 10) {
                                            if (
                                              childItem.nav ===
                                              "setInputWindowVisible"
                                            )
                                              setInputWindowVisible(true);
                                            else {
                                              setInputWindowDelete(true);

                                              navigation.navigate(
                                                childItem.nav
                                              );
                                            }
                                          } else setModalVisible(true);
                                        }}
                                      >
                                        <img
                                          src={childItem.icon}
                                          style={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 7,
                                          }}
                                        />
                                        <CustomText>
                                          {childItem.name}
                                        </CustomText>
                                      </ChildMenuItem>
                                    ) : (
                                      <ChildMenuItem>
                                        <img
                                          src={childItem.icon}
                                          style={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 7,
                                          }}
                                        />
                                        <CustomText>
                                          {childItem.name}
                                        </CustomText>
                                      </ChildMenuItem>
                                    )}

                                    {idx !== menuItem.child.length - 1 ? (
                                      <BorderLine />
                                    ) : (
                                      <></>
                                    )}
                                  </Fragment>
                                );
                              })}
                            </ChildMenuContainer>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </ParentsMenuItem>

                    {menuItem.name === "New" ? <BorderLine /> : <></>}
                  </Fragment>
                );
              })}
            </ParentsMenuContainer>
          ) : (
            <></>
          )}
        </ControlBar>
      </BackgroundContainer>
      <BottomSheet
        btsVisible={btsVisible}
        setBtsVisible={setBtsVisible}
        header="사진 옵션 선택"
        body={
          <FlexBox direction="column" style={{ width: "100%" }}>
            {photoSelArr.map((item, idx) => {
              return (
                <Fragment key={item + " " + idx}>
                  <FlexBox
                    onClick={() => {
                      handleBts(idx);
                    }}
                    style={{
                      minHeight: 50,
                      paddingLeft: 5,
                      width: "100%",
                    }}
                  >
                    <CustomText>{item}</CustomText>
                  </FlexBox>

                  {idx === 0 ? <BorderLine /> : <></>}
                </Fragment>
              );
            })}
          </FlexBox>
        }
      ></BottomSheet>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msg="이름은 최대 10개 까지만 만들 수 있어요. 다른 이름을 생성하고 싶다면 폴더를 삭제해주세요."
        title={
          <FlexBox>
            <img
              src="images/icons/warning.png"
              style={{
                width: 22,
                height: 22,
                marginRight: 3,
                marginLeft: 5,
              }}
            />
            <CustomText color={colorStyle.white}>Error!</CustomText>
          </FlexBox>
        }
      />

      <CustomModal
        modalVisible={appInfoVisible}
        setModalVisible={setAppInfoVisible}
        msg={
          <FlexBox direction="column" style={{ padding: 10 }}>
            <CustomText>
              안녕 여러분! 저는 이 앱의 개발자입니다. 지금부터 저의
              애플리케이션에 대한 소개를 할까 합니다. '이름 짓기'라는 주제로
              앱을 만들게 된 건, 다들 겪는 시간 낭비를 줄이기 위해서였습니다. 한
              번 쯤은 게임 닉네임을 뭘로 할지 고민하지 않으셨나요? 간지 작살나는
              닉네임을 짓고 싶은 마음은 굴뚝같지만 생각이 나지 않아 골치
              아프셨을 겁니다.
            </CustomText>
            <CustomText></CustomText>
            <CustomText>구구절절..</CustomText>
            <CustomText></CustomText>
            <CustomText>
              아무튼 그래서 간지 작살 닉네임도 만들고, 멋쟁이 신분증도 만들고
              싶어 이렇게 앱을 만들게 되었습니다. 잠깐이나마 즐거우셨으면
              좋겠네요. 감사합니다!
            </CustomText>

            <FlexBox style={{ padding: 10, width: "100%" }} justify="flex-end">
              <FlexBox>
                <CustomText fontSize={10}>{"개발자 커피 사주기 >"}</CustomText>

                <img
                  src="images/icons/coffee.png"
                  width={24}
                  style={{
                    marginLeft: 5,
                    marginRight: 3,
                  }}
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        }
        title="information"
      />
      {/* <AppInfo isOpen={appInfoVisible} setClose={setAppInfoDelete} /> */}
    </>
  );
}
