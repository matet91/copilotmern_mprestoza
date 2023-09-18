#build reactapp and server
build:
	@echo "Building reactapp and server"
	@cd reactapp && docker build -t "reactapp" ./
	@cd server && docker build -t "server" ./

#docker compose up
up:
	@echo "Starting docker compose"
	@docker-compose -f ./docker-compose.yml up -d

#docker compose down
down:
	@echo "Stopping docker compose"
	@docker-compose down