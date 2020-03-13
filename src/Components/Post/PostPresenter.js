import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import BoldText from "../BoldText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, CommentIcon, Prev, Next } from "../Iconst";
import DotCarousel from "../DotCarousel";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

const Post = styled.div`
  ${props => props.theme.whiteBox}
  width:100%;
  max-width: 700px;
  margin-top: 100px;
  margin-bottom: 25px;
  user-select: none;
`;

const Header = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 90%;
  background-color: white;
`;

const File = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.2s linear;
`;

const Button = styled.span`
  display: inline-block;
  width: 36px;
  height: 30px;
  text-align: center;
  transition: all ease 0.1s;
  &:active {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const SlideButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  ${props => (props.type === "prev" ? "left: 10px" : "right: 10px")};
  opacity: 0.7;
`;

const Meta = styled.div`
  padding: 15px;
  position: relative;
`;

const MetaRow = styled.div`
  position: absolute;
  top: 20px;
  left: 330px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  opacity: 0.5;
  display: block;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: #c7c7c7 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;
const override = css`
  display: block;
  margin: 0 auto;
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  targetIndex,
  showPrev,
  showNext,
  isLeftEnd,
  isRightEnd,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  loading
}) => {
  return (
    <Post>
      <Header>
        <Avatar size={"sm"} url={avatar} />
        <UserColumn>
          <BoldText text={username} />
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              key={file.id}
              id={file.id}
              src={file.url}
              showing={index === targetIndex}
            />
          ))}
        {!isLeftEnd && (
          <SlideButton type="prev" onClick={showPrev}>
            <Prev />
          </SlideButton>
        )}
        {!isRightEnd && (
          <SlideButton type="next" onClick={showNext}>
            <Next />
          </SlideButton>
        )}
      </Files>
      <Meta>
        <MetaRow>
          {files && files.length > 1 && (
            <DotCarousel length={files.length} active={targetIndex} />
          )}
        </MetaRow>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <BoldText text={`좋아요 ${likeCount}개`} />
        {comments && (
          <Comments>
            {comments.map(comment => (
              <Comment key={comment.id}>
                <BoldText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
            {selfComments.map(comment => (
              <Comment key={comment.id}>
                <BoldText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}

        <Timestamp>{createdAt}</Timestamp>
        {loading ? (
          <HashLoader css={override} size={30} color={"black"} />
        ) : (
          <Textarea
            placeholder={"댓글달기..."}
            value={newComment.value}
            onChange={newComment.onChange}
            onKeyPress={onKeyPress}
          />
        )}
      </Meta>
    </Post>
  );
};
