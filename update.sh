CHAINCODE_VERSION=$1 #Passe como parametro o numero da versão do chaincode

CONTRACT_NAME="chaincode"

#Carregando chaincode para dentro do cli
docker cp chaincode/. cliFabric:/opt/gopath/src/github.com

#Iniciando upgrade da rede

docker exec cliFabric peer chaincode install -n ${CONTRACT_NAME} -v ${CHAINCODE_VERSION} -p /opt/gopath/src/github.com -l node
docker exec cliFabric peer chaincode upgrade -n ${CONTRACT_NAME} -v ${CHAINCODE_VERSION} -c '{"Args":[""]}' -C mychannel -P "AND ('Org1MSP.member')"




