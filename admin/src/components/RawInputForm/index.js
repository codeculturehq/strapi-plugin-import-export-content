import React, { useState, memo } from "react";
import PropTypes from "prop-types";

import { Label, Select, Textarea, Button } from "@buffetjs/core";
import { Row } from "../../components/common";

import FORMATS from "../../constants/formats";

function RawInputForm({ onSubmit }) {
  const [rawText, setRawText] = useState("");
  const [rawFormat, setRawFormat] = useState(FORMATS[0].mimeType || "");

  const handleRawTextArea = ({ target: { value } }) => setRawText(value);
  const handleFormatSelect = ({ target: { value } }) => setRawFormat(value);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit({
      data: rawText,
      type: rawFormat,
    });
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      <Row>
        <Label message="Data Format" htmlFor="dataFormats" />
        <Select
          name="dataFormats"
          options={FORMATS.map(({ name, mimeType }) => ({
            label: name,
            value: mimeType,
          }))}
          value={rawFormat}
          onChange={handleFormatSelect}
        />
      </Row>
      <Row>
        <Textarea
          name="rawTextArea"
          className="col-12"
          textStyle={{ fontFamily: "monospace" }}
          value={rawText}
          onChange={handleRawTextArea}
        />
      </Row>
      <Row>
        <Button type="submit" label={"Analyze"} />
      </Row>
    </form>
  );
}

RawInputForm.defaultProps = {
  onSubmit: () => {},
};

RawInputForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(RawInputForm);