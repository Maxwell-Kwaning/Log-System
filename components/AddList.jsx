import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uid } from "uuid";
import { actionTypes } from "../consts/actions";

export const AddList = ({ title, label, tags, addTag, editTag, removeTag }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTagId) => {
    removeTag(removedTagId);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue.trim()) {
      addTag({ id: uid(), value: inputValue });
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    editTag({
      index: editInputIndex,
      value: editInputValue,
    });
    setEditInputIndex(-1);
    setInputValue("");
  };

  return (
    <div style={{ margin: "0 0 2rem 1rem" }}>
      <div>{label}</div>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag.id}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
              style={{ width: "200px" }}
            />
          );
        }

        const isLongTag = tag.value.length > 20;
        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag.id}
            closable={true}
            onClose={() => handleClose(tag.id)}
          >
            <span
              onDoubleClick={(e) => {
                setEditInputIndex(index);
                setEditInputValue(tag.value);
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.value.slice(0, 20)}...` : tag.value}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.value} key={tag.id}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          style={{ width: "200px" }}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> {title}
        </Tag>
      )}
    </div>
  );
};
