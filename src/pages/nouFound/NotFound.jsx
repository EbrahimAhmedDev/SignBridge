import React from "react";
import { Link } from "react-router-dom";
import style from "./notFound.module.css";

const NotFound = () => {
  return (
    <div className={style.notFoundWrapper}>
      <div className={style.contentBox}>
        <h1 className={style.errorCode}>404</h1>
        <p className={style.errorText}>Page Not Found</p>
        <Link to="/" className={style.goHomeBtn}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;