"use client";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { CameraDevice } from "html5-qrcode/esm/camera/core";
import { useEffect, useState } from "react";

export default function QrCode({ setter, setHide, hide, ActionMaker }: any) {
  const [camera, setCamera] = useState<CameraDevice[] | undefined>();
  const [choosen, setChoose] = useState("");

  function onScanSuccess(decodedText: any, decodedResult: any) {
    html5QrCode.stop();
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  let html5QrCode: any;

  useEffect(() => {
    if (html5QrCode !== undefined && hide == false) {
      setChoose("");
      html5QrCode
        .stop()
        .then((ignore: any) => {
          // QR Code scanning is stopped.
        })
        .catch((err: any) => {
          // Stop failed, handle it.
        });
    }
  }, [hide]);
  console.log(ActionMaker);
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCamera(devices);
        if (devices && devices.length) {
          var cameraId = devices[0].id;
          setChoose("");
        }
      })
      .catch((err) => {
        // handle err
      });
  }, []);

  useEffect(() => {
    html5QrCode = new Html5Qrcode("QrCode");
    if (choosen !== "") {
      html5QrCode
        .start(
          choosen,
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: { width: 500, height: 500 }, // Optional, if you want bounded box UI
          },
          (decodedText: any, decodedResult: any) => {
            setter(hide.type, decodedText);
            setHide({ hide: false, type: hide.type });
            html5QrCode.stop();
          },
          (errorMessage: any) => {}
        )
        .catch((err: any) => {});
      console.log(html5QrCode);
    } else {
      html5QrCode.clear();
    }
  }, [choosen]);

  return (
    <>
      <div className="card w-96 mx-auto bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <div className="w-full h-full" id="QrCode"></div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Camera</h2>
          <select
            name=""
            value={choosen}
            onChange={(e) => {
              setChoose(e.target.value);
            }}
            id=""
          >
            <option defaultChecked={true} value="">
              Camera
            </option>
            {camera?.map((value: any, key: number) => {
              return (
                <option key={key} value={value.id}>
                  {value.label}
                </option>
              );
            })}
          </select>
          <div className="card-actions"></div>
        </div>
      </div>
    </>
  );
}
