import instance from "../lib/axios/instance";
import { IFileUrl } from "../types/File";
import ENDPOINT from "./endpoint";

const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const MediaService = {
  uploadFile: (payload: FormData) =>
    instance.post(`${ENDPOINT.MEDIA}/upload/single`, payload, formDataHeader),
  deleteFile: (payload: IFileUrl) =>
    instance.delete(`${ENDPOINT.MEDIA}/delete`, { data: payload }),
};

export default MediaService;
