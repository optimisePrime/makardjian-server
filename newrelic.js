'use strict'

exports.config = {
  app_name: ['My Application'],
  license_key: '847973467e7473edfc4cdd3d2daf7d29f13ff109',
  logging: {
    level: 'trace',
    filepath: '../../../newrelic_agent.log'
  },
  utilization: {
    detect_aws: false,
    detect_pcf: false,
    detect_azure: false,
    detect_gcp: false,
    detect_docker: false
  },
  transaction_tracer: {
    enabled: true
  }
}
