(function() {

    angular
        .module('suseData.crowbar')
        .factory('crowbarBackupFactory', crowbarBackupFactory);

    crowbarBackupFactory.$inject = ['$q', '$http', '$filter', 'COMMON_API_V1_HEADERS', 'COMMON_API_V2_HEADERS'];
    /* @ngInject */
    function crowbarBackupFactory($q, $http, $filter, COMMON_API_V1_HEADERS, COMMON_API_V2_HEADERS) {
        var factory = {
            create: createBackup,
            get: getBackup
        };

        return factory;

        /**
         * Create a new backup of the Administration Node
         *
         * @return {Promise}
         */
        function createBackup() {

            var requestOptions = {
                method: 'POST',
                url: '/api/upgrade/adminbackup',
                data: { backup: { name: 'upgrade-backup-' + $filter('date')(new Date, 'yyyyMMddHHmmss') } },
                headers: COMMON_API_V2_HEADERS
            };

            return $http(requestOptions);
        }

        /**
         * Download a specific backup based on its Id
         *
         * @param  {Number} Backup Id to be downloaded
         * @return {Promise}
         */
        function getBackup(id) {
            // this should never happen, caller should make sure 'id' is set
            if (angular.isUndefined(id)) {
                throw Error('getBackup() called without id.');
            }

            var requestOptions = {
                method: 'GET',
                cache: false,
                responseType: 'arraybuffer',
                url: '/utils/backups/' + id + '/download',
                // this is not strictly needed here, but can be left for consistency
                headers: COMMON_API_V1_HEADERS
            };

            return $http(requestOptions);
        }
    }
})();
