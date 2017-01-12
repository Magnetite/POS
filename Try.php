
<?php


function TryC(){
try
            {
                // connect to database
                $handle = new PDO("mysql:dbname=" . "restaurant" . ";host=" . "localhost","root", "");
				// ensure that PDO::prepare returns false when passed invalid SQL
                $handle->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); 
				
				//default value of $query
				$query = "select * from menu where in_stock > ?";
				
				
				
				$table = "menu";
				
				if (isset($_GET['t']) ){
				
					$table = $_GET['t'];
				
				}
				
				
				
				if (isset($_GET['c']) ){
				
					
					
					$query = "INSERT INTO " . $table . " VALUES ( " . $_GET['c'] . " );" ;
					
					$stmt = $handle->prepare($query);
					$stmt->execute();
					
				} else if(isset($_GET['r1']) ){
				
					//All rows of table
					$query = "SELECT * FROM " . $table ;
				
				
				} else if(isset($_GET['r2']) ){
				
					//Only certain rows of table
					$query = "SELECT * FROM " . $table . " WHERE " . $_GET['P1'] . " = " . $_GET['P2'];
				
				
				} else if (isset($_GET['u']) ){
					
					//Turn string into an array, to easily update stock values
					$IdStk = explode("-", $_GET['u']); 
					
						//Iterate and update all values
					for($i = 0, $len = count($IdStk); $i < $len; $i += 2){
					
						
						$query = "UPDATE menu SET in_stock=" . $IdStk[$i + 1] . " WHERE id=" . $IdStk[$i];
						
						//Need function here to process $query!
						$stmt = $handle->prepare($query);
						$stmt->execute();
					}
					
					return 0;
					
					
				}  else if (isset($_GET['u1']) ){
					
					//Turn string into an array, to easily update stock values
					$UpdateStr = explode("-", $_GET['u1']); 
					
						//Iterate and update all values
					for($i = 0, $len = count($UpdateStr); $i < $len; $i += 3){
					
						
						$query = "UPDATE " . $table . " SET " . $UpdateStr[$i + 1] . " = " . $UpdateStr[$i + 2] . " WHERE id = " . $UpdateStr[$i] ;
						
						//Need function here to process $query!
						$stmt = $handle->prepare($query);
						$stmt->execute();
					}
					
					return 0;
					
					
				} else if (isset($_GET['d'])){
				
					$n = "name";
					
					if (isset($_GET['ds'])){ $n = $_GET['ds'];}
					
					$query = "DELETE FROM " . $table . " WHERE " . $n . "=" . $_GET['d'];
					
					$stmt = $handle->prepare($query);
					$stmt->execute();
				    
				}
				
				$stmt = $handle->prepare($query);
				$stmt->execute([0]);
				
				
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
				return $rows;
				
                
            }
            catch (Exception $e)
            {
                // trigger (big, orange) error
                trigger_error($e->getMessage(), E_USER_ERROR);
                exit;
            }
			}
			
			
			
			
			function Creater(){
			
				//Set default create string value
				    $query = "";
			
			}
			
			
			function Updater($arr){
			
				//Put a loop here! Iterate and update all Values
				for($i = 0, $len = count($arr); $i < $len; $i += 2){
				
					
				    $query = "UPDATE menu SET in_stock=" . $arr[$i + 1] . " WHERE id=" . $arr[$i];
					
					//Need function here to process $query!
					$stmt = $handle->prepare($query);
					$stmt->execute();
				}
			
			}
			
			
			function Deleter($menu_id){
				
				$query = "DELETE FROM menu WHERE id=" . $menu_id ;
			
			}
			
			function Executer($q){
			
			$stmt = $handle->prepare($q);
			$stmt->execute([0]);
			

			
				
			
			}
		
			
			
		?>