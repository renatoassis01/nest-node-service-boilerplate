up-postgres-daemon:
	docker-compose -f docker-compose.postgres.yaml up -d 
up-postgres:
	docker-compose -f docker-compose.postgres.yaml up 

down:
	docker-compose -f docker-compose.postgres.yaml down
logs:
	docker-compose -f docker-compose.postgres.yaml logs 
