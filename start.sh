CONTRACT_NAME="chaincode"
clear
rm -r backEnd/wallet

docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)


docker rmi $(docker images |grep 'peer0')


cd ./network/basic-network
./start.sh


cd ..
cd ./configuration/cli
docker-compose -f docker-compose.yml up -d cliFabric

sleep 5

SHA256="ed30d41195761412edf99efc30bf9ed508c9b8a6c13eb2986d4bb9994d5a9468"

echo "Installing chaincode..."
docker exec cliFabric peer chaincode install -n ${CONTRACT_NAME} -v 0 -p /opt/gopath/src/github.com -l node
echo "Instantiating chaincode..."
docker exec cliFabric peer chaincode instantiate -n ${CONTRACT_NAME} -v 0 -l node -c '{"Args":["initLedger"]}' -C mychannel -P "AND ('Org1MSP.member')"
sleep 10

echo "Invoking chaincode..."
docker exec cliFabric peer chaincode invoke -n chaincode -c '{"Args":["criarLivro", "1", "Genesis", "Vitor Baggi", "2019"]}' -C mychannel
