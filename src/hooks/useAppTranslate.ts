import { useTranslation } from "react-i18next";

const useAppTranslate = () => useTranslation().t;

const useErrorTranslate = () => useTranslation(["errors"]).t;

export { useAppTranslate, useErrorTranslate };
