"use client";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { CameraDevice } from "html5-qrcode/esm/camera/core";
import { useEffect, useState } from "react";

export default function QrCode({ setter, setHide, hide }: any) {
  const [camera, setCamera] = useState<CameraDevice[] | undefined>();
  const [choosen, setChoose] = useState("");

  function onScanSuccess(decodedText: any, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  let html5QrCode: any;
  useEffect(() => {
    if (html5QrCode !== undefined && hide == false) {
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

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCamera(devices);
        if (devices && devices.length) {
          var cameraId = devices[0].id;
          setChoose(cameraId);
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
            setter(decodedText);
            setHide(false);
          },
          (errorMessage: any) => {}
        )
        .catch((err: any) => {});
    }
  }, [choosen]);

  return (
    <>
      <div
        data-theme="light"
        className="card w-96 mx-auto bg-base-100 shadow-xl"
      >
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
