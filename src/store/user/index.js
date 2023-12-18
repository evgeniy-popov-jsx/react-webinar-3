import StoreModule from "../module";

/**
 * Состояние профиля - авторизация
 */

class UserState extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            auth: false,
            waiting: false,
            user: {
                name: '',
                phone: '',
                email: '',
            },
            error: '',
        }
    }
    /**
     * Запрос авторизации
     */
    async userAuth(data) {
        try {
            const response = await fetch('/api/v1/users/sign', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();
          
            if (response.ok) {
                // Сохранение токена в локальное хранилище
                localStorage.setItem('X-Token', json.result.token);
                localStorage.setItem('User-Id', json.result.user._id);

                this.setState({
                    auth: true,
                    user: {
                        name: json.result.user.profile.name,
                        phone: json.result.user.profile.phone,
                        email: json.result.user.email,
                    },
                    error: '',
                });
                window.location.href = '/profile';
            } else {
                console.log(json)
                this.setState({
                    ...this.initState(),
                    error: json.error.data.issues[0].message,
                });
            }
        } catch (err) {
            this.setState({
                ...this.initState(),
                error: json.error.data.issues[0].message,
            });
        }
    }   
    // Проверка авторизации
    async checkAuth () {
        const token = localStorage.getItem('X-Token');
        const userId = localStorage.getItem('User-Id');

        // Установка признака ожидания загрузки
        this.setState({
            ...this.initState(),
            waiting: true
        });

        if(!token || !userId) {
            this.setState({
                ...this.getState(),
                auht: false,
                waiting: false,
                error: '',
            });
        } else {
            try {
                const response = await fetch(`/api/v1/users/${userId}`, {
                    headers: {
                        "X-Token": token,
                    }
                });
                const json = await response.json();

                if (json.result) {
                  this.setState({
                    ...this.getState(),
                    auth: true,
                    waiting: false,
                    user: {
                        name: json.result.profile.name,
                        phone: json.result.profile.phone,
                        email: json.result.email,
                    },
                    error: null,
                  });
                  localStorage.setItem('X-Token', token);
                  localStorage.setItem('User-Id', json.result._id);
                } else {
                  this.setState({
                    ...this.getState(),
                    auth: false,
                    waiting: false,
                    user: {},
                    error: 'Вы не авторизированны',
                  });
                  localStorage.removeItem('X-Token');
                  localStorage.removeItem('User-Id');
                }
            } catch(error) {
                this.setState({
                    ...this.getState(),
                    auth: false,
                    waiting: false,
                    user: {},
                    error: error.message,
                  });
            }
        } 
    }
    // Выход из авторизации :D
    async outAuth() {
        const token = localStorage.getItem('X-Token');

        const response = await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Token' : token,
          }
        });
        localStorage.removeItem('X-Token');
        localStorage.removeItem('User-Id');

        const json = await response.json();

        if (json.result) {
          this.setState({
            ...this.getState(),
            auth: false,
            user: {},
            error: null
          })
        };
        if (json.error) {
          this.setState({
            ...this.getState(),
            user: {},
            authStatus: false,
            error: json.error.message
          })
        }
      }
    
}

export default UserState;
