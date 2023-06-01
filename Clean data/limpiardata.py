import pandas as pd
import os

def generate_clean_dataSet(data):

    df_resultados_audios = data

    for x in data['input']:
        if x['cantidad de palabras'] == 207:
            df_resultados_audios['Grupo de alumnos'] = "2do"
        else:
            df_resultados_audios['Grupo de alumnos'] = "4to"

    for x in data['output']:
        df_resultados_audios['confianz'] = x['media de confianza']
        df_resultados_audios['AccuracyScore'] = x['media de AccuracyScore']
        df_resultados_audios['FluencyScore'] = x['media de FluencyScore']
        df_resultados_audios['CompletenessScore'] = x['media de CompletenessScore']
        df_resultados_audios['PronScore'] = x['media de PronScore']
        df_resultados_audios['Cantidad de palabras leidas'] = x["cantidad de palabras"]

    Omission = 0
    Insertion = 0
    Mispronunciation = 0
    Total_errors = 0

    for x in data['output']:
        for parrafo in x["parrafos"]:
            for palabra in parrafo["NBest"][0]["Words"]:
            
                if palabra['PronunciationAssessment']["ErrorType"] == 'Omission':
                    Omission = Omission + 1
                
                if palabra['PronunciationAssessment']["ErrorType"] == 'Insertion':
                    Insertion = Insertion + 1
                
                if palabra['PronunciationAssessment']["ErrorType"] == 'Mispronunciation':
                    Insertion = Insertion + 1
                        
    Total_errors = Omission + Insertion + Mispronunciation

    df_resultados_audios['Total errores'] = Total_errors
    df_resultados_audios['Omissions'] = Omission
    df_resultados_audios['Insertions'] = Insertion
    df_resultados_audios['Mispronunciations'] = Mispronunciation


    df_resultados_audios.drop('input', axis=1, inplace=True)
    df_resultados_audios.drop('output', axis=1, inplace=True)

    return df_resultados_audios

# list the elements in the Output folder
Output = os.listdir('../Output')
# define the clean_data_test var as a array to save the cleaned data
clean_data_tests = []

# loop in the Output arrayn:
for file in Output:
    # save the json data in the data variable
    data = pd.read_json(f'../Output/{file}')
    # save the cleaned data in the "clean_data_tests" array caling the "generate_clean_dataSet" function
    clean_data_tests.append(generate_clean_dataSet(data))

# concat all the data in the "clean_data_tests" array
final_data = pd.concat(clean_data_tests, ignore_index=True)
# export the data to a CSV file
final_data.to_csv('output.CSV')

