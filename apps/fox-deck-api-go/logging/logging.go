package logging

import (
	"fmt"
	"log"
	"net/url"
	"time"
)

type LogO struct {
	Message string
}

func Debug(filename string, debugMsg string) {
	log.Printf("(%s) => %s", filename, debugMsg)
}

func HttpController(method string, url *url.URL, duration time.Duration) {
	message := fmt.Sprintf("[%s] %s - took %dms", method, url.Path, duration.Milliseconds())
	Debug("HTTP Controller", message)
}

func Fatal(err error) {
	log.Fatal(err)
}
