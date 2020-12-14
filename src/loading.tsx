import React, { FunctionComponent } from "react";

interface Props {
  message: string
}

export const Loading: FunctionComponent<Props> = ({ message }) => {
  return (
    <div className="notification has-text-centered py-6">
      <p>
        <span className="icon mb-6">
          <i className="fas fa-3x fa-spinner fa-pulse" />
        </span>
      </p>
      <p>{message}</p>
    </div>
  )
}
