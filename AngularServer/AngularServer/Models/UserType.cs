using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularServer.Models
{
    public class UserType
    {
        public string Login { get; set; }
        public bool HasPermissions { get; set; }
    }
}
