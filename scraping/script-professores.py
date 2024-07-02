from bs4 import BeautifulSoup
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select

import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException 
from selenium.webdriver.support import expected_conditions as EC
import json

options = Options()
options.add_experimental_option("detach", True)

""" 

    O trecho de código abaixo adiciona ao navegador de testes automatizados 
    argumentos já existentes do meu usuário do chrome, como cache e cookies já existentes.
    Desse modo é possível carregar o estado da página mais rapidamente.

    A cada execução do script, a página recarregava novamente todas as imagens, dados e cookies,
    tornando a execução muito lenta durante o carregamento das informações dos professores da fga.

    Para a correta execução do script em sua máquina, altere o endereço dos diretórios nos parâmetros
    de options.add_argument(). 

"""

options.add_argument("--headless=new")
options.add_argument("--user-data-dir=C:/Users/Admin/AppData/Local/Google/Chrome/User Data")
options.add_argument("--profile-directory=Profile 1")
options.add_argument("--disk-cache-dir=C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cache")

###########################################################################################################

driver = webdriver.Chrome(options= options)

url='https://sigaa.unb.br/sigaa/public/docente/busca_docentes.jsf?aba=p-academico'
driver.get(url)
arquivo_json = 'dados.json'

def adicionar_disciplina(nome_professor, disciplina, codigo, carga_horaria, semestre, arquivo_json):
    # Carregar o conteúdo atual do arquivo JSON
    with open(arquivo_json, 'r', encoding="utf-8") as file:
        data = json.load(file)

    # Procurar pelo professor com o nome fornecido
    for professor in data["professores"]:
        if professor["nome"] == nome_professor:
            # Verificar se a disciplina já existe para esse semestre
            if semestre in professor["disciplinas"] and any(disciplina_existente["nome"] == disciplina for disciplina_existente in professor["disciplinas"][semestre]):
                return
            # Adicionar a disciplina ao semestre correspondente
            if semestre not in professor["disciplinas"]:
                professor["disciplinas"][semestre] = []
            professor["disciplinas"][semestre].append({"nome": disciplina, "codigo": codigo, "carga_horaria": carga_horaria})
            break

    # Escrever de volta no arquivo JSON
    with open(arquivo_json, 'w', encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)


def adicionar_professor(nome_professor, codigo_professor, arquivo_json):
    # Carregar o conteúdo atual do arquivo JSON, se existir
    try:
        with open(arquivo_json, 'r', encoding="utf-8") as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {"professores": []}

    # Caso o professor já esteja no JSON, retorna a função
    for professor in data["professores"]:
        if professor["nome"] == nome_professor:
            return

    # Adicionar o novo professor à lista de professores
    data["professores"].append({"nome": nome_professor, "codigo": codigo_professor, "disciplinas": {}})

    # Escrever de volta no arquivo JSON
    with open(arquivo_json, 'w', encoding="utf-8") as file:
        json.dump(data, file, indent=2,  ensure_ascii=False)

try:

    # Espera o carregamento do menu suspenso do depertamento até estar clicável
    departamento_dropdown = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "form:departamento"))
    )

    # Clica no menu do departamento
    departamento_dropdown.click()

    # Seleciona o departamento da Faculdade do Gama pelo value='673' no html
    select_departamento = Select(departamento_dropdown)
    select_departamento.select_by_value("673")

    # Clica no botão de busca
    buscar = driver.find_element("id", "form:buscar")
    buscar.click()

    listagem_professores = driver.find_elements(By.CLASS_NAME, 'listagem')[1].find_elements(By.TAG_NAME, 'tr')
    # print(listagem_professores[1].find_element(By.CLASS_NAME, 'nome').text)

    paginas_professores = driver.find_elements(By.TAG_NAME, 'a')[4:] 

    links = []
    for link in paginas_professores:
        links.append(link.get_attribute('href'))

    # print(links)

    
    for link in links:


        driver.get(link)

        nome_professor_visivel = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.TAG_NAME, 'h3'))
        )
        
        nome_professor = driver.find_element(By.TAG_NAME, 'h3').text
        codigo_professor = link.split('=')[-1]
        
        # print(codigo_professor)

        adicionar_professor(nome_professor, codigo_professor, arquivo_json)

        # codigo_siape = professor.find_element(By.TAG_NAME, 'a').get_attribute('href').split('=')[-1]
        # print(codigo_siape)

        pagina_disciplinas = driver.find_elements(By.CLASS_NAME, 'disciplinas_ministradas')[0].click()
        disciplinas_graduacao = driver.find_element(By.ID, 'ext-comp-1001__ext-comp-1007').click()
        informacoes = driver.find_elements(By.TAG_NAME, 'tr')

        
        # Guarda o semestre atual
        semestre = ''
        json_infos = [nome_professor, 1]
        max_semestres = 0
        for linhas in informacoes:
            
            # Executa o scrapping para somente os 2 ultimos semestres
            if(max_semestres == 3):
                break

            try:
                linhas.get_attribute('class') == 'anoPeriodo'
                semestre = linhas.find_element(By.CLASS_NAME, 'anoPeriodo').text
                json_infos[1] = semestre
                max_semestres += 1
                
            except NoSuchElementException:
                pass

            # if (linhas.get_attribute('class') == 'anoPeriodo'):
            #     semestre = linhas.find_element(By.TAG_NAME, 'td').text
            #     json_infos[1] = semestre
            
            try: 
                codigo = linhas.find_element(By.CLASS_NAME, 'codigo').text
                json_infos.append(codigo)
                # print(codigo)
            except NoSuchElementException: 
                pass

            try:
                disciplina = linhas.find_element(By.TAG_NAME, 'a').text
                json_infos.append(disciplina)
            except NoSuchElementException:
                pass
            
            try:
                carga_horaria = linhas.find_element(By.CLASS_NAME, 'ch').text
                json_infos.append(carga_horaria)
            except NoSuchElementException:
                pass
             
            if (len(json_infos) == 5):
                
                # print(f"{nome_professor} {semestre} {codigo} {disciplina} {carga_horaria}")
                if (semestre == "" or codigo == "" or disciplina == "" or disciplina == ""):
                    pass
                else:
                    adicionar_disciplina(nome_professor, disciplina, codigo, carga_horaria, semestre, arquivo_json)
                    json_infos = [nome_professor, semestre]
            

except:
    driver.quit()

finally:
    driver.quit()
