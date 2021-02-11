export const API = "https://demos.inbonis.com/api-coach-es-informa";

export interface PostDiagnosis{
  dni: string;
  activitySector: string
}

export const sendDiagnosis = async ({ dni, activitySector }: PostDiagnosis) => {

    return await fetch(`${API}/diagnosis/anon`, {
      method: "POST",
      body: JSON.stringify({
        nif: dni,
        activity_sector: activitySector
      }),
    })
      .then((response) => response.json())
      .then(data => data)
      .catch((error) => error);
  };