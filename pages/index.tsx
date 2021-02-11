import Head from "next/head";
import { Layout } from "../components/UI/Layout";
import { FormItem } from "../components/UI/FormItem";
import { FormSelect } from "../components/UI/FormSelect";
import {
  COMMON_CONTINUE,
  COMMON_LABEL_EMPTY,
  COMMON_NIF_ERROR,
  NIF,
  SECTOR_ACTIVITY,
  HOME_TITLE,
} from "../utils/utilities-string";
import { useQuery } from "react-query";
import { Button } from "../components/UI/Button";
import { useState } from "react";
import { ActionMeta, ValueType } from "react-select";
import { sendDiagnosis, PostDiagnosis } from "../services/api/post";
import styles from "../styles/Home.module.css";

const getActivities =
  "https://demos.inbonis.com/api-coach-es-informa/activities";

export default function Home() {
  const [valueNif, setValueNif] = useState<string>();
  const [valueSection, setSection] = useState<any>();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery("repoData", () => {
    return fetch(`${getActivities}`)
      .then((res) => res.json())
      .then((data) => data);
  });

  const handleSection = (option: ValueType<any>, actionMeta: ActionMeta) => {
    console.log({ option });
    if (actionMeta.action === "select-option") {
      setSection(option);
    }
  };

  const isNifValid = () => {
    if (!!/^[a-z]{1}[0-9]{8}?$/i.test(valueNif)) return "";
    else if (!valueNif) return COMMON_LABEL_EMPTY;
    return COMMON_NIF_ERROR;
  };

  const onSubmit = () => {
    setLoading(true);
    try {
      sendDiagnosis({
        dni: valueNif,
        activitySector: valueSection.value,
      } as PostDiagnosis)
        .then((data) => {
          setResult(data), setLoading(false);
        })
        .catch(() => {
          setResult({ errorCode: 500 }), setLoading(false);
        });
    } catch (error) {
    } finally {
    }
  };

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Head>
        <title>{HOME_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.container}>
          {result?.errorCode && <p>No podemos obtener datos de su empresa.</p>}
          {result && !result?.errorCode ? (
            <pre>
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          ) : (
            <form onSubmit={onSubmit}>
              <FormItem
                value={valueNif}
                onChange={(event) => setValueNif(event.target.value)}
                label={isNifValid()}
                placeholder={NIF}
              />
              <div>
                <FormSelect
                  label={COMMON_LABEL_EMPTY}
                  placeholder={SECTOR_ACTIVITY}
                  data={data}
                  currentValue={valueSection}
                  setCurrentValue={handleSection}
                />
              </div>
              <Button
                onClick={(e) => onSubmit()}
                title={COMMON_CONTINUE}
                disabled={!!isNifValid() || !valueSection}
              />
            </form>
          )}
        </div>
      </Layout>
    </div>
  );
}
