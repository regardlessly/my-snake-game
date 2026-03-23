REMOTE ?= timmy@timmys-mac-mini.tail33631c.ts.net

.PHONY: dev deploy setup-remote logs health

dev:
	uv run uvicorn orchestrator.server:app --reload --host 0.0.0.0 --port 8200

deploy:
	./deploy.sh $(REMOTE)

setup-remote:
	ssh $(REMOTE) 'bash -s' < setup_remote.sh

logs:
	ssh $(REMOTE) 'tail -f /tmp/caritahub-escalation.log /opt/livekit/livekit.log'

health:
	@echo "--- LiveKit ---"
	@curl -sf http://$(REMOTE):7880 || echo "FAILED"
	@echo ""
	@echo "--- Orchestrator ---"
	@curl -sf http://$(REMOTE):8200/api/health || echo "FAILED"
