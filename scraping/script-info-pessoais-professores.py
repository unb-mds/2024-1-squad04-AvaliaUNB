from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException 
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup
import os

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

# options.add_argument("--headless=new")
options.add_argument("--user-data-dir=C:/Users/Admin/AppData/Local/Google/Chrome/User Data")
options.add_argument("--profile-directory=Profile 1")
options.add_argument("--disk-cache-dir=C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cache")

###########################################################################################################

driver = webdriver.Chrome(options= options)

url='https://sigaa.unb.br/sigaa/public/docente/busca_docentes.jsf?aba=p-academico'
driver.get(url)

arquivo_json = 'info-pessoais.json'

def adicionar_info_pessoais(codigo, email, sala, graduacoes):
    if not os.path.exists(arquivo_json):
        data = {"dados": []}
    else:
        try:
            with open(arquivo_json, 'r', encoding="utf-8") as file:
                data = json.load(file)
        except json.JSONDecodeError:
            data = {"dados": []}

    professor_info = {
        "codigo": codigo,
        "email": email,
        "sala": sala,
        "graduacoes": graduacoes
    }

    if any(prof['codigo'] == codigo for prof in data["dados"]):
        print(f"Professor com código {codigo} já está presente no JSON.")
    else:
        data["dados"].append(professor_info)
    
    with open(arquivo_json, 'w', encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

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

    paginas_professores = driver.find_elements(By.TAG_NAME, 'a')[4:]

    links = []
    for link in paginas_professores:
        links.append(link.get_attribute('href'))
    links = links[:-1]

    codigos = []
    for codigo in links:
        # codigos.append(codigo.split("=")[-1])
        driver.get(codigo)

        nome_professor_visivel = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CLASS_NAME, 'ano'))
        )

        html_content = driver.page_source
        soup = BeautifulSoup(html_content, 'html.parser')

        graduacao_info = []
        for dt in soup.find_all('dt'):
            if 'GRADUA' in dt.get_text():
                dd = dt.find_next_sibling('dd')
                while dd and dd.name == 'dd':
                    graduacao_info.append(dd.get_text(separator=" ", strip=True))
                    next_element = dd.find_next_sibling()
                    if next_element and next_element.name == 'dt':
                        break

                    dd = dd.find_next_sibling('dd')
                    


        infos = driver.find_elements(By.TAG_NAME, ('dd'))

        codigo_professor = codigo.split("=")[-1]
        email = infos[-1].text
        sala = infos[-3].text

        adicionar_info_pessoais(codigo_professor, email, sala, graduacao_info)

    

finally:
    driver.quit()

