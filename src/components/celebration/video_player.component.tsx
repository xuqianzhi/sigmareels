import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeColor } from "@components/common/constants";
import LinearProgress from "@mui/material/LinearProgress";
import "@components/common/styles.css";
import { getVideoDownloadUrl } from "@common/firestore";

interface VideoProps {
  className?: string;
  orderId?: string;
}

const VideoPlayer: FC<VideoProps> = ({ className, orderId }) => {
  const [url, setUrl] = useState<string>();
  const [fetchVideoError, setFetchVideoError] = useState<boolean>(false);

  const fetchVideoUrl = async () => {
    const res = await getVideoDownloadUrl(orderId);
    if (res.data) {
      setUrl(res.data);
      setFetchVideoError(false);
    } else {
      setUrl("");
      setFetchVideoError(true);
    }
  };

  useEffect(() => {
    fetchVideoUrl();
  }, []);

  const Loading: FC = () => (
    <div className="loading-wrapper great-vibe-font">
      <div>{"Video Loading..."}</div>
      <LinearProgress
        sx={{ marginTop: "30px", backgroundColor: ThemeColor.CREAM }}
      />
    </div>
  );

  const Error: FC = () => (
    <div
      className="error-text-wrapper protest-riot-font"
      style={{ fontSize: "3vw" }}
    >
      <div>Hey! Your video isn't ready yet</div>
      <div>Please come back later</div>
      <div>Thanks!</div>
    </div>
  );

  return (
    <div className={className}>
      <div className="container">
        {fetchVideoError && <Error />}
        {!fetchVideoError &&
          (url ? (
            <video controls style={{ width: "100vw", height: "100vh" }}>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Loading />
          ))}
      </div>
    </div>
  );
};

export default styled(VideoPlayer)`
  .container {
    background: linear-gradient(
      to bottom right,
      ${ThemeColor.CREAM},
      ${ThemeColor.CREAM_END}
    );
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading-wrapper {
    width: 65%;
    text-align: center;
    color: ${ThemeColor.ORANGE};
    font-size: 4vw;
  }

  .error-text-wrapper {
    width: 65%;
    height: auto;
    color: black;
    overflow-wrap: break-word;
    font-size: 8vw;
    text-align: center;
  }
`;
