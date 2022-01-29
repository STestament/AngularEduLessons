using AngularServer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularServer.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private static UserType[] _user = new UserType[] {
            new UserType() { Login = "king", Pass = "1", HasPermissions = true, FirstName = "Ангуляр", SurName = "Жоэсович" },
            new UserType() { Login = "city", Pass = "1", HasPermissions = false, FirstName = "Жоэс", SurName = "Натив" },
        };

        public UserController()
        {
            
        }
        [HttpGet]
        public UserType GetUser(string loginName)
        {
            var currentUser = _user.FirstOrDefault(user => user.Login.Equals(loginName));
            return currentUser;
        }
        [HttpGet]
        public UserType GetUserData(string loginName, string pass) {
            var currentUser = _user.FirstOrDefault(user => user.Login.Equals(loginName) && user.Pass.Equals(pass));
            return currentUser;
        }
        [HttpGet]
        public bool SaveDataUser(string loginName, string firstName, string surName) {
            var currentUser = _user.FirstOrDefault(user => user.Login.Equals(loginName));
            currentUser.Login = loginName;
            currentUser.FirstName = firstName;
            currentUser.SurName = surName;
            return true;
        }
    }
}
