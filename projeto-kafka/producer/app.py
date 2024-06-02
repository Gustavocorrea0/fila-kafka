from flask import Flask, request, jsonify
from kafka import KafkaProducer
import json
import time

app = Flask(__name__)

def create_kafka_producer():
    producer = None
    while producer is None:
        try:
            producer = KafkaProducer(
                bootstrap_servers='kafka:9092',
                value_serializer=lambda v: json.dumps(v).encode('utf-8')
            )
        except Exception as e:
            print(f"Failed to connect to Kafka: {e}")
            time.sleep(5)
    return producer

producer = create_kafka_producer()

@app.route('/produce', methods=['POST'])
def produce():
    data = request.json
    producer.send('car_topic', value=data)
    producer.flush()
    return jsonify({"status": "Message sent"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)